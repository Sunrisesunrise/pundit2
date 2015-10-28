angular.module('Pundit2.Annotators')

.constant('PAGEHANDLERDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#PageHandler
     *
     * @description
     * `object`
     *
     * Configuration for Page Handler module
     */


    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#PageHandler.cMenuType
     *
     * @description
     * `string`
     *
     * Contextual menu type shown by the page handler
     *
     * Default value:
     * <pre> cMenuType: 'textFragmentHandlerItem' </pre>
     */
    cMenuType: "pageHandlerItem",


    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#PageHandler.debug
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

.service('PageHandler', function($document, PAGEHANDLERDEFAULTS, BaseComponent, 
    NameSpace, Item, ItemsExchange, XpointersHelper, Consolidation) {

    var pageHandler = new BaseComponent('PageHandler', PAGEHANDLERDEFAULTS);

    var getPageMetadata = function() {
        var metadata = {};
        var metaTags = angular.element('meta');

        angular.forEach(metaTags, function(meta) {
            if (meta.name === 'keywords') {
                if (typeof(meta.content) !== 'undefined') {
                    metadata.keywords = meta.content.split(',');
                }
            }
            if (meta.name === 'description') {
                if (typeof(meta.content) !== 'undefined') {
                    metadata.description = meta.content;
                }
            }
        });
        return metadata;
    };

    // Creates a proper Item from page
    pageHandler.createItemFromPage = function() {
        var values = {},
            item;

        values = getPageMetadata();
        values.uri = XpointersHelper.getSafePageContext();
        values.label = $document[0].title || "No title";

        if (typeof(values.description) === 'undefined') {
            values.description = values.label;
        }
        values.type = [NameSpace.types.page];
        // item.rdfData = semlibItems.createBucketForPage(item).bucket;

        item = new Item(values.uri, values);
        Consolidation.updateItemListAndMap(item, 'page');

        return item;
    };

    pageHandler.getPageItem = function() {
        var pageItem = ItemsExchange.getItemByUri(XpointersHelper.getSafePageContext());

        if (typeof pageItem !== 'undefined') {
            return pageItem;
        }

        return pageHandler.createItemFromPage();
    };


    pageHandler.log('Component up and running');
    return pageHandler;
});