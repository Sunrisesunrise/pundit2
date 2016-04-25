angular.module('Pundit2.Atoka')

.constant('ATOKADEFAULTS', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Atoka
     *
     * @description
     * `object`
     *
     * Configuration object for Atoka module.
     */

    /**
     * @ngdoc property
     * @name modules#Atoka.active
     *
     * @description
     * `boolean`
     *
     * Default state of the atoka module
     *
     * Default value:
     * <pre> active: false </pre>
     */
    active: false,

    apiBaseUrl: 'https://api-u.spaziodati.eu/v2/',
    baseUri: 'https://atoka.io/azienda/-/',
    token: '936813c74be545cf9072d8ce078affff',

    /**
     * @ngdoc property
     * @name modules#Atoka.debug
     *
     * @description
     * `boolean`
     *
     * Active debug log
     *
     * Default value:
     * <pre> debug: false </pre>
     */
    debug: false
})

.service('Atoka', function($q, BaseComponent, Item, XpointersHelper, NameSpace, $http, ATOKADEFAULTS) {
    var atoka = new BaseComponent('Atoka', ATOKADEFAULTS);

    var state = {
        companies: [],
        details: {}
    };

    var getCompaniesFromAnnotations = function(annotations) {
        var companies = annotations.filter(function(item) {
            if (item.sameAs !== null) {
                if (typeof item.sameAs.atokaUri !== 'undefined' && 
                    item.sameAs.atokaUri !== null) {
                    if (item.sameAs.atokaUri.match(/people$/) === null) {
                        return true;
                    }
                }
            }
            return false;
        });

        if (companies.length === 0) {
            return [];
        }

        companies.sort(function(a, b) {
            return a.id - b.id;
        });

        var ret = [companies[0]],
            last = companies[0];

        for (var len = companies.length, i = 1; i < len; i++) {
            if (companies[i].id !== last.id) {
                ret.push(companies[i]);
                last = companies[i];
            }
        }

        return ret;
    };

    var getAtokaIdFromCompany = function(company) {
        var uri = company.sameAs.atokaUri,
            lastSlash = uri.lastIndexOf('/');

        return uri.substr(lastSlash + 1, uri.length);
    };

    var getSelectListFromCompanies = function(companies) {
        return companies.map(function(company) {
            return {
                label: company.title,
                value: getAtokaIdFromCompany(company)
            };
        });
    };

    var getAtokaIdsFromCompanies = function(companies) {
        return companies.map(getAtokaIdFromCompany);
    };

    var init = function() {
        $.ajax({
            url: atoka.options.apiBaseUrl + 'companies/annotate?token=h-' + atoka.options.token,
            type: 'POST',
            data: {
                include: 'image,types,categories,abstract,sameAs',
                url: window.location.href.indexOf('localhost:9000') === -1 ? window.location.href : 'http://www.ilsole24ore.com/art/SoleOnLine4/Tecnologia%20e%20Business/2006/12/DGT_MEMORIES_ALLLIFELONG01120FAZZINO.shtml' // TODO: temp
            }
        }).then(function(data) {
            if (typeof data !== 'undefined' &&
                typeof data.annotations !== 'undefined') {
                var companies = state.companies = getCompaniesFromAnnotations(data.annotations),
                    atokaIds = getAtokaIdsFromCompanies(companies);

                for (var len = atokaIds.length, i = 0; i < len; i++) {
                    atoka.log('ask about', atokaIds[i]);
                    $.ajax({
                        type: 'GET',
                        url: atoka.options.apiBaseUrl + 'companies/' + atokaIds[i] + '?token=h-' + atoka.options.token + '&packages=base,web',
                    }).then(function(companyData) {
                        atoka.log('company detail', companyData);

                        state.details[companyData.item.id] = companyData;
                        // annotationPopover.companiesData.companyData[companyData.item.id] = companyData;
                    });
                }

                // annotationPopover.companiesData.isLoading = false;
                // annotationPopover.companiesData.companies = labels;

                atoka.log('annotations', companies, atokaIds);
            }
        });
    };

    atoka.getSelectList = function() {
        if (state.companies.length > 0) {
            return getSelectListFromCompanies(state.companies);
        }
    }

    atoka.getCompanies = function() {
        return state.companies;
    };

    atoka.getDetails = function() {
        return stata.details;
    };

    atoka.getDetailsById = function(id) {
        if (typeof stata.details[id] !== 'undefined') {
            return state.details[id];
        }
    };

    atoka.createItemFromCompanyDetails = function(details) {
        // console.log(entity)
        var values = {};

        values.uri = atoka.options.baseUri + details.id;
        values.description = details.name;
        values.label = details.name;
        values.type = values.type = [NameSpace.types.atoka];
        values.pageContext = XpointersHelper.getSafePageContext();

        if (typeof details.web.logo !== 'undefined') {
            values.image = details.web.logo;
        }

        values[NameSpace.atoka.hasFullAddress] = details.base.registeredAddress.fullAddress;
        values[NameSpace.atoka.hasAteco] = details.base.ateco[0].code + ': ' + details.base.ateco[0].description;

        return new Item(values.uri, values);
    };

    if (atoka.options.active) {
        init();
    }

    return atoka;
});