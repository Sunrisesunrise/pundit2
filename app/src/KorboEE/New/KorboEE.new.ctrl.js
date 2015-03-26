angular.module('KorboEE')
.controller('KeeNewCtrl', function ($scope, $rootScope, $dropdown, $modal, KorboCommunicationService, $q, KorboCommunicationFactory,
                                    korboConf, $timeout, $http, TypesHelper, ItemsExchange, ContextualMenu, $window, MyPundit, EventDispatcher,
                                    Config, APIService, TripleComposer, Item, ResourcePanel, AnnotationsCommunication) {

    $scope.tripleComposerName = korboConf.tripleComposerName;


    var copyCheck = false,
        korboComm = new KorboCommunicationFactory(),
        delay,
        api = APIService.get($scope.conf.globalObjectName),
        basketIDforEdit,
        revertStore = {},
        urlPattern = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i'),
        // Tooltip messages for languages,
        tooltipMessageTitle = "Insert title of the entity in ",
        tooltipMessageDescription = "Insert description of the entity in ",
        errorMandatory = "The Title field is mandatory and must be filled",
        errorLabelTooShort = " The Title must be contain at least " + $scope.conf.labelMinLength + " characters",
        timer;

    var searchConf = {
        discardSearch: function() {
            //Breadcrumbs.itemSelect($scope.conf.breadcrumbName, (Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 2));
        },
        selectUrl: function(item) {
            if (typeof item !== 'undefined' && typeof item.resource !== 'undefined') {
                $scope.originalUrl = item.resource;
                //Breadcrumbs.itemSelect($scope.conf.breadcrumbName, (Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 2));
            }
        },
        copyFromLOD: function(item) {
            console.log("COPY FROM LOD", item);
            $scope.tabs = [];
            $scope.disactiveLanguages = [];
            buildLanguagesModel(item.uri, item.providerFrom);
        },
        subTypeSearchURL: 'SearchURL',
        subTypeSearchAndCopy: 'SearchAndCopy',
        searchFieldLabelSearchURL: 'Search entity URL:',
        searchFieldLabelSearchAndCopy: 'Search entity to copy:',
        subType: ''
    };

    var setCurrentInnerPane = function(name) {
        switch(name) {
            /* DEPRECATED*/
            /*
             case 'SearchURL':
             case 'SearchAndCopy':
             //searchConf.subType = name;
             //KorboCommunicationService.setSearchConf('inner', searchConf);
             name = 'search';
             break;
             */
            case 'tripleComposer':
                addEntityToAllSubjects();
                TripleComposer.initContextualMenu();
                TripleComposer.showHeader(false, korboConf.tripleComposerName);
                TripleComposer.showFooter(false, korboConf.tripleComposerName);
                KorboCommunicationService.tripleComposerStateChangeCallback = tripleComposerStateChangeCallback;
                break;
            default:
                // Restore triplecomposer header and footer.
                //KorboCommunicationService.setSearchConf('tab');
                break;
        }
        for (var i in $scope.innerPanes.panes) {
            $scope.innerPanes.panes[i].visible = (i == name);
        }

        $scope.innerPanes.current = name;

        ResourcePanel.hide();
        //ContextualMenu.modifyDisabled('showAdvanceOptions', name === 'advancedOptions');
        //ContextualMenu.modifyDisabled('searchAndCopy', name === 'search');
    }

    // Callback to handle triplecomposer statements changes.
    var tripleComposerStateChangeCallback = function() {
        // $timeout will cause another digest cycle to be executed.
        // This is needed because statement is added/removed/duplicated but
        // digest cycle is still in progress.
        $timeout(addEntityToAllSubjects, 10);
    }

    // Initialize types array.
    var initTypes = function () {
        $scope.types = [];
    };

    var addActionToContextualMenu = function (lang) {
        ContextualMenu.addAction({
            name: 'rml' + lang.name,
            type: 'advancedMenu',
            label: 'Remove ' + lang.name,
            priority: 1,
            showIf: function () {
                return $scope.conf.contextMenuActiveItems.removeLanguages;
            },
            action: function (_lang) {
                return function () {
                    if ($scope.tabs.length > 1) {
                        $scope.removeLanguage(_lang);
                    }
                };
            }(lang)
        });
    };

    var pushCurrentLang = function (lang) {
        if ($scope.tabs.length === 1) {
            addActionToContextualMenu(lang);
            ContextualMenu.modifyDisabled('rml' + $scope.tabs[0].name, true);
        }
        else {
            if ($scope.tabs.length === 2) {
                addActionToContextualMenu(lang);
                ContextualMenu.modifyDisabled('rml' + $scope.tabs[0].name, false);
            }
            else {
                if ($scope.tabs.length > 2) {
                    addActionToContextualMenu(lang);
                }
            }
        }
    };

    // Add items to contextual menu.
    var buildContextualMenu = function () {
        /* DEPRECATED */
        /*
         ContextualMenu.addAction({
         name: 'showAdvanceOptions',
         type: 'advancedMenu',
         label: 'Advanced options',
         priority: 10,
         showIf: function () {
         return $scope.conf.contextMenuActiveItems.advancedOptions;
         },
         action: function () {
         $scope.showAdvancedOptions();
         }
         });
         */

        /* DEPRECATED */
        /*
         ContextualMenu.addAction({
         name: 'tripleComposer',
         type: 'advancedMenu',
         label: 'Triple composer',
         priority: 9,
         showIf: function () {
         return $scope.conf.tripleComposerEnabled && $scope.conf.contextMenuActiveItems.tripleComposer;
         },
         action: function () {
         $scope.showTripleComposer();
         }
         });
         */

        ContextualMenu.addAction({
            name: 'editURL',
            type: 'advancedMenu',
            label: 'Edit original URL',
            priority: 3,
            showIf: function () {
                return $scope.conf.contextMenuActiveItems.editOriginalUrl;
            },
            action: function () {
                $scope.originalUrlCheck = false;
                ContextualMenu.modifyDisabled('editURL', true);
            }
        });

        /* DEPRECATED */
        /*
         ContextualMenu.addAction({
         name: 'searchOriginalURL',
         type: 'advancedMenu',
         label: 'Search original URL',
         priority: 3,
         showIf: function () {
         return $scope.editMode && $scope.conf.contextMenuActiveItems.searchOriginalUrl;
         },
         action: function () {
         setCurrentInnerPane('SearchURL');
         }
         });
         */

        ContextualMenu.addAction({
            name: 'updateAllData',
            type: 'advancedMenu',
            label: 'Update all data',
            priority: 8,
            disable: true,
            showIf: function () {
                return $scope.conf.contextMenuActiveItems.updateAllData;
            },
            action: function () {
                /*noop*/
            }
        });

        /* DEPRECATED */
        /*
         ContextualMenu.addAction({
         name: 'searchAndCopy',
         type: 'advancedMenu',
         label: 'Search and copy from LOD',
         priority: 7,
         showIf: function () {
         return $scope.conf.contextMenuActiveItems.searchAndCopyFromLOD;
         },
         action: function () {
         Breadcrumbs.appendItem($scope.conf.breadcrumbName, {
         label: 'Search and copy from LOD',
         name: 'search',
         unique: true,
         callback: function() {
         setCurrentInnerPane('SearchAndCopy');
         ContextualMenu.modifyDisabled('searchAndCopy', true);
         // Override breadcrumb label in case of "search" already exists.
         Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 1, 'Search and copy from LOD');
         }
         });
         setCurrentInnerPane('SearchAndCopy');
         ContextualMenu.modifyDisabled('searchAndCopy', true);
         // Override breadcrumb label in case of "search" already exists.
         Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 1, 'Search and copy from LOD');
         }
         });
         */


        ContextualMenu.addAction({
            name: 'korboHelp',
            type: 'advancedMenu',
            label: 'Korbo help',
            priority: 6,
            showIf: function () {
                return $scope.conf.contextMenuActiveItems.korboHelp;
            },
            action: function () {
                $scope.openWindow($scope.conf.korboHelpURL);
            }
        });

        if ($scope.conf.contextMenuActiveItems.removeLanguages) {
            ContextualMenu.addDivider({
                priority: 3,
                type: 'advancedMenu'
            });
        }
    };

    var buildTypesFromConfiguration = function () {
        var tmp = angular.copy($scope.conf.type);
        for (var i in tmp) {
            var indexFind = $scope.types.map(function (e) {
                return e.URI;
            }).indexOf(tmp[i].URI);
            if (indexFind === -1) {
                var t = {};
                t.URI = tmp[i].URI;
                t.label = tmp[i].label;
                t.checked = tmp[i].state || false;
                $scope.types.push(t);
            }
            else {
                $scope.types[indexFind].checked = true;
            }

        }
    };

    var buildTypesFromArray = function (typesToAdd) {
        for (var i = 0; i < typesToAdd.length; i++) {
            var indexFind = $scope.types.map(function (e) {
                return e.URI;
            }).indexOf(typesToAdd[i]);
            if (indexFind === -1) {
                var t = {};
                t.URI = typesToAdd[i];
                t.label = TypesHelper.getLabel(typesToAdd[i]);
                t.checked = true;
                $scope.types.push(t);
            }
            else {
                $scope.types[indexFind].checked = true;
            }
        }
    };

    // Build languages tabs.
    var buildLanguageTabs = function () {
        $scope.conf.languages.sort(function(a, b){
            var a_val = a.value.toLowerCase();
            var b_val = b.value.toLowerCase();
            return a_val === $scope.conf.defaultLanguage ? -1 : b_val === $scope.conf.defaultLanguage ? 1 : 0;
        });
        for (var i = 0; i < $scope.conf.languages.length; i++) {
            if ($scope.conf.languages[i].value.toLowerCase() === $scope.conf.defaultLanguage) {
                $scope.conf.languages[i].state = true;
            }
            var title = angular.uppercase($scope.conf.languages[i].value);
            var name = angular.lowercase($scope.conf.languages[i].name);

            var indexFind = $scope.tabs.map(function (e) {
                return angular.lowercase(e.title);
            }).indexOf(angular.lowercase(title));
            if (indexFind !== -1) {
                return;
            }

            var lang = {
                'title': title,
                'name': $scope.conf.languages[i].name,
                'description': "",
                'label': "",
                'mandatory': true,
                'hasError': false,
                'tooltipMessageTitle': tooltipMessageTitle + name,
                'tooltipMessageDescription': tooltipMessageDescription + name,
                'tooltipMessageError': "message",
                'tooltipMessageErrorTab': "There are some errors in the " + name + " languages fields"
            };

            if (typeof($scope.entityToCreate) !== 'undefined' && $scope.entityToCreate !== null) {
                lang.label = $scope.entityToCreate.label;
            }

            if ($scope.conf.languages[i].state) {
                $scope.tabs.push(lang);
                pushCurrentLang(lang);
                if ($scope.conf.languages[i].value.toLowerCase() === $scope.conf.defaultLanguage) {
                    //Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, 0, lang.label);
                }
            }
            else {
                $scope.disactiveLanguages.push(lang);
            }

            // if(!$scope.editMode){
            //     if($scope.conf.languages[i].state){
            //         $scope.tabs.push(lang);
            //         pushCurrentLang(lang);
            //     } else {
            //         $scope.disactiveLanguages.push(lang);
            //     }
            // } else {
            //     var indexFind = $scope.tabs.map(function(e){ return angular.lowercase(e.title) }).indexOf(angular.lowercase(lang.title));
            //     if(indexFind === -1){
            //         $scope.disactiveLanguages.push(lang);
            //     }
            // }
        }
    };

    var updateEntityTitlePreview = function() {
        var newLabel = $scope.tabs[0].label;
        var charLimit = 25;
        if (typeof charLimit === 'number') {
            charLimit = charLimit < 4 ? 4 : charLimit;
            if (newLabel.length > charLimit) {
                newLabel = newLabel.substr(0, charLimit) + '...';
            }
        }

        newLabel = newLabel.length == 0 ? 'Entity title' : newLabel;
        $scope.entityTitle = newLabel;
    }

    // Add given or current entity to all statement subjects.
    var addEntityToAllSubjects = function(entity) {
        var label = $scope.tabs[0].label;
        label = typeof label === 'undefined' || label.length == 0 ? 'Entity title' : label;
        var typesURI = [];
        angular.forEach($scope.selectedTypes(), function(type) {
            typesURI.push(type.URI);
        });
        if (typeof entity === 'undefined') {
            entity = {
                uri: '',
                label: label,
                type: typesURI
            };
        }
        if (entity.type.length == 0) {
            return;
        }

        if (typeof entity.uri === 'undefined' || entity.uri.length == 0) {
            entity.uri = 'temporary-uri';
        }
        var item = new Item(entity.uri, entity);
        TripleComposer.addToAllSubject(item, true, korboConf.tripleComposerName);
    }

    var buildLanguagesModel = function (entityUri, provider, overrideProperties) {

        $scope.topArea = {
            'message': 'Loading entity...',
            'status': 'info'
        };
        $scope.loadingStatus = true;

        // New AnnotationServer APIs require basketID.
        //var currentBasketID = (provider === 'korbo' ? null : $scope.conf.basketID);
        var currentBasketID = $scope.conf.basketID;

        var param = {
            item: {uri: entityUri},
            provider: provider,
            endpoint: $scope.conf.endpoint,
            basketID: currentBasketID,
            language: $scope.conf.defaultLanguage
        };
        var langConf = $scope.conf.languages;

        initTypes();
        buildTypesFromConfiguration();

        KorboCommunicationService.buildLanguagesObject(param, langConf, $scope.conf.useCredentialInHttpCalls).then(function (res) {
            var loadedItem = res.loadedItem;
            delete res.loadedItem;

            if (typeof(res.basketId) !== 'undefined' && res.basketId !== null) {
                $scope.prevBasketID = res.basketId;
                basketIDforEdit = res.basketId;
            }
            else {
                basketIDforEdit = $scope.prevBasketID;
            }

            //basketIDforEdit = res.basketId;
            $scope.imageUrl = res.imageUrl;
            $scope.originalUrl = res.originalUrl;

            if (typeof overrideProperties !== 'undefined') {
                if (typeof overrideProperties.imageUrl !== 'undefined') {
                    $scope.imageUrl = overrideProperties.imageUrl;
                }
                if (typeof overrideProperties.originalUrl !== 'undefined') {
                    $scope.originalUrl = overrideProperties.originalUrl;
                }
            }

            initTypes();
            buildTypesFromArray(res.types);
            buildTypesFromConfiguration();

            res.languages.sort(function(a, b){
                var a_val = a.title.toLowerCase();
                var b_val = b.title.toLowerCase();
                return a_val === $scope.conf.defaultLanguage ? -1 : b_val === $scope.conf.defaultLanguage ? 1 : 0;
            });
            var tempLang = {};
            for (var i in res.languages) {
                $scope.tabs.push(res.languages[i]);
                tempLang[res.languages[i].title.toLowerCase()] = true;
                pushCurrentLang(res.languages[i]);
                if (res.languages[i].title.toLowerCase() === $scope.conf.defaultLanguage) {
                    //Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, 0, res.languages[i].label);
                    updateEntityTitlePreview();
                }
            }

            buildLanguageTabs();

            angular.forEach($scope.conf.languages, function(lang) {
                if (!tempLang.hasOwnProperty(lang.value.toLowerCase())) {
                    var langObj = {
                        'title': lang.value.toUpperCase(),
                        'name': lang.name.toLowerCase(),
                        'description': "",
                        'label': "",
                        'mandatory': true,
                        'hasError': false,
                        'tooltipMessageTitle': tooltipMessageTitle + lang.name.toLowerCase(),
                        'tooltipMessageDescription': tooltipMessageDescription + lang.name.toLowerCase(),
                        'tooltipMessageError': "message",
                        'tooltipMessageErrorTab': "There are some errors in the " + lang.name.toLowerCase() + " languages fields"
                    };
                    $scope.disactiveLanguages.push(langObj);
                }
            });

            if ($scope.conf.tripleComposerEnabled &&
            $scope.conf.tripleComposerForCustomFields &&
            typeof loadedItem.custom_fields !== 'undefined') {
                TripleComposer.reset(korboConf.tripleComposerName);
                var triples = [];
                for (var keyPredicate in loadedItem.custom_fields) {
                    var predicate = ItemsExchange.getItemByUri(keyPredicate);
                    if (typeof predicate === 'undefined') {
                        continue;
                    }
                    for (var objectIndex in loadedItem.custom_fields[keyPredicate]) {
                        if (triples.length >= 1) {
                            TripleComposer.addStatement(korboConf.tripleComposerName);
                        }
                        var statementObject = loadedItem.custom_fields[keyPredicate][objectIndex].value,
                            itemObject = statementObject;
                        // Check if it's an uri first.
                        if (loadedItem.custom_fields[keyPredicate][objectIndex].type === 'uri') {
                            statementObject = {
                                uri: loadedItem.custom_fields[keyPredicate][objectIndex].value,
                                type: loadedItem.custom_fields[keyPredicate][objectIndex].uri_types,
                                label: loadedItem.custom_fields[keyPredicate][objectIndex].uri_label
                            }
                            itemObject = new Item(statementObject.uri, statementObject);
                        }
                        else {
                            // Check if it's a date.
                            var resMatch = statementObject.match(/^[0-9]{2,4}-[0-9]{1,2}-[0-9]{1,2}$/g);
                            if (resMatch !== null) {
                                var testDate = new Date(statementObject);
                                if (!isNaN(testDate.getTime())) {
                                    itemObject = testDate;
                                }
                            }
                        }

                        triples.push({
                            predicate: predicate,
                            itemObject: itemObject
                        });
                    }
                }
                $timeout(function() {
                    for (var i in triples) {
                        TripleComposer.addToPredicate(triples[i].predicate, korboConf.tripleComposerName);
                        TripleComposer.addToObject(triples[i].itemObject, korboConf.tripleComposerName);
                    }
                }, 200);
            }

            //Breadcrumbs.itemSelect($scope.conf.breadcrumbName, 0);

            $scope.topArea = {
                'message': 'You are editing the entity...',
                'status': 'info'
            };
            $scope.loadingStatus = false;

        },
        function () {
            $scope.topArea = {
                'message': 'Error getting entity info!',
                'status': 'error'
            };
        });
    };

    // Check if language field are all right filled.
    var checkLanguages = function () {
        var allLangAreOk = true;
        for (var l = 0; l < $scope.tabs.length; l++) {

            (function (index) {
                if (typeof($scope.tabs[index].label) === 'undefined' || $scope.tabs[index].label === '') {
                    $scope.tabs[index].hasError = true;
                    allLangAreOk = false;
                    $scope.tabs[index].tooltipMessageError = errorMandatory;
                }
                else {
                    if ($scope.tabs[index].label.length < $scope.conf.labelMinLength) {
                        $scope.tabs[index].hasError = true;
                        allLangAreOk = false;
                        $scope.tabs[index].tooltipMessageError = errorLabelTooShort;
                    }
                    else {
                        $scope.tabs[index].hasError = false;
                    }
                }

            })(l);
        }
        return allLangAreOk;
    };

    // Add other info to triple built graph.
    var addTripleObjectInfo = function () {
        var triplesData = TripleComposer.buildGraph(korboConf.tripleComposerName);
        var statements = TripleComposer.getStatements(korboConf.tripleComposerName);
        var objects = {};
        for (var i in statements) {
            var triple = statements[i].scope.get();
            objects[triple.object.uri] = triple.object;
        }

        for (var subjectURI in triplesData) {
            for (var predicateURI in triplesData[subjectURI]) {
                for (var i in triplesData[subjectURI][predicateURI]) {
                    if (triplesData[subjectURI][predicateURI][i].type === 'uri') {
                        var objectData = objects[triplesData[subjectURI][predicateURI][i].value];
                        if (typeof objectData !== 'undefined') {
                            triplesData[subjectURI][predicateURI][i].uri_lang = $scope.conf.defaultLanguage;
                            triplesData[subjectURI][predicateURI][i].uri_label = objectData.label;
                            triplesData[subjectURI][predicateURI][i].uri_types = angular.copy(objectData.type);
                        }
                    }
                }
            }
        }
        return triplesData;
    }

    var doSave = function () {
        var checkLang = checkLanguages();
        $scope.updateTypes();
        $scope.checkUrl();

        if (!$scope.imageUrlHasError && !$scope.typesHasError && checkLang) {
            $scope.isSaving = true;
            $scope.topArea.message = "Saving entity...";
            $scope.topArea.status = "info";

            // Get checked types.
            var newTypes = [];
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].checked) {
                    newTypes.push($scope.types[i].URI);
                }
            }
            var lang = angular.lowercase($scope.tabs[0].title);

            var entityToSave = {
                // "label": $scope.tabs[0].label,
                // "abstract": $scope.tabs[0].description,
                "depiction": $scope.imageUrl,
                "type": newTypes,
                "resource": $scope.originalUrl
            };

            // declare object returned onSave() call
            var obj = {};
            obj.label = $scope.tabs[0].label;
            obj.type = newTypes;
            obj.image = $scope.imageUrl;
            obj.description = $scope.tabs[0].label;
            obj.language = $scope.conf.defaultLanguage;

            var basketID;
            if ($scope.editMode) {
                entityToSave.id = String($scope.idEntityToEdit);
                basketID = basketIDforEdit;
            }
            else {
                basketID = $scope.conf.basketID;
            }

            var promise = korboComm.save(entityToSave, lang, $scope.conf.endpoint, basketID, $scope.conf.useCredentialInHttpCalls);
            promise.then(function (res) {

                // get id from location of entity just created// All other label types, take the last part
                var id;
                if ($scope.editMode) {
                    id = String($scope.idEntityToEdit);
                }
                else {
                    id = res.substring(res.lastIndexOf('/') + 1);
                }

                var location = res;
                var allPromises = [];

                // Checks if annotation needs to be saved first.
                var annotationNeedsToBeSaved =  $scope.conf.tripleComposerEnabled && TripleComposer.isAnnotationComplete(korboConf.tripleComposerName);

                if (annotationNeedsToBeSaved) {
                    // Using triple composer for create annotations.
                    var entityForTripleComposer = {};
                    entityForTripleComposer.label = $scope.tabs[0].label;
                    entityForTripleComposer.type = newTypes;
                    entityForTripleComposer.image = $scope.imageUrl;
                    entityForTripleComposer.description = $scope.tabs[0].label;
                    entityForTripleComposer.language = $scope.conf.defaultLanguage;
                    entityForTripleComposer.uri = res;
                    addEntityToAllSubjects(entityForTripleComposer);

                    var httpTriplesPromise = undefined;
                    if (!$scope.conf.tripleComposerForCustomFields) {
                        httpTriplesPromise = AnnotationsCommunication.saveAnnotation(
                        TripleComposer.buildGraph(korboConf.tripleComposerName),
                        TripleComposer.buildItems(korboConf.tripleComposerName),
                        TripleComposer.buildTargets(korboConf.tripleComposerName)
                        );
                    }
                    else {
                        triplesData = addTripleObjectInfo();
                        httpTriplesPromise = korboComm.addItemCustomFields($scope.conf.endpoint, $scope.conf.defaultLanguage,basketID, triplesData, $scope.conf.useCredentialInHttpCalls);
                    }

                    httpTriplesPromise.then(innerLanguageSave,
                    function () {
                        $scope.topArea.message = "Entity annotation saving error!";
                        $scope.topArea.status = "error";
                    });
                }
                else {
                    innerLanguageSave();
                }

                function innerLanguageSave() {
                    if ($scope.conf.languagesSaveMethod === 'multipleCall') {
                        for (var i = 0; i < $scope.tabs.length; i++) {
                            (function (index) {
                                var lang = angular.lowercase($scope.tabs[index].title);
                                var entityToEdit = {
                                    "id": id,
                                    "label": typeof $scope.tabs[index].label === 'undefined' ? '' : $scope.tabs[index].label,
                                    "abstract": typeof $scope.tabs[index].description === 'undefined' ? '' : $scope.tabs[index].description
                                };
                                var langPromise = korboComm.save(entityToEdit, lang, $scope.conf.endpoint, basketID, $scope.conf.useCredentialInHttpCalls);
                                allPromises.push(langPromise);
                            })(i);
                        }
                    }
                    else if ($scope.conf.languagesSaveMethod === 'singleCall') {
                        var languagesData = [];
                        for (var i = 0; i < $scope.tabs.length; i++) {
                            var lang = angular.lowercase($scope.tabs[i].title);
                            var langData = {
                                "label": typeof $scope.tabs[i].label === 'undefined' ? '' : $scope.tabs[i].label,
                                "abstract": typeof $scope.tabs[i].description === 'undefined' ? '' : $scope.tabs[i].description,
                                "language": lang
                            };
                            languagesData.push(langData);
                        }
                        var langPromise = korboComm.saveAllLanguages(id, languagesData, $scope.conf.endpoint, basketID, $scope.conf.useCredentialInHttpCalls);
                        allPromises.push(langPromise);
                    }

                    $q.all(allPromises).then(function () {
                        $scope.isSaving = false;
                        if ($scope.conf.useTafonyCompatibility) {
                            $scope.directiveScope.location = location;
                            $scope.directiveScope.elemToSearch = $scope.tabs[0].label;
                            $scope.directiveScope.label = $scope.tabs[0].label;
                        }
                        $scope.topAreaMessage = "Entity saved!";
                        $scope.topArea.message = "Entity saved!";
                        $scope.topArea.status = "info";

                        //TODO fire onSave
                        obj.value = location;
                        // fire save callback
                        api.fireOnSave(obj);

                        if (typeof resourcePanelLastPromise !== 'undefined') {
                            var itemFotTC = new Item(res, {
                                label : $scope.tabs[0].label,
                                type : newTypes,
                                image : $scope.imageUrl,
                                description : $scope.tabs[0].label,
                                language : $scope.conf.defaultLanguage,
                                uri : res
                            });
                            resourcePanelLastPromise(itemFotTC);
                        }



                        $timeout(function () {
                            ContextualMenu.wipeActionsByType('advancedMenu');
                            KorboCommunicationService.closeModal();
                            // fire cancel callback
                            api.fireOnCancel();
                            // set modal as close in configuration
                            korboConf.setIsOpenModal(false);
                            EventDispatcher.sendEvent('KorboEE.entitySaved', id);
                        }, 1000);
                    },
                    function () {
                        $scope.topArea.message = "Entity saving error!";
                        $scope.topArea.status = "error";
                    });
                }
            },
            function () {
                $scope.topArea.message = "Entity saving error!";
                $scope.topArea.status = "error";
            });
        }
        else {
            $scope.topArea.message = "Some errors occurred! Check the fields and try to save again...!";
            $scope.topArea.status = "error";
        }
    };

    $scope.innerPanes = {
        current: 'simpleOptions',
        panes: {
            simpleOptions: {
                visible: true
            },
            advancedOptions: {
                visible: false
            },
            search: {
                visible: false
            },
            tripleComposer: {
                visible: false
            }
        }
    }

    $scope.changeInnerPane = function(innerPane) {
        setCurrentInnerPane(innerPane);
    }
    $scope.prevBasketID;
    $scope.entityTitle = 'Entity title';
    $scope.tabs = [];
    $scope.disactiveLanguages = [];
    $scope.disactiveLanguagesPopoverTemplate = 'src/KorboEE/New/KorboEE.languagesPopover.tmpl.html';
    $scope.imageUrl = "";
    $scope.saveClicked = false;
    $scope.activeFilter = false;
    $scope.isSaving = false;
    $scope.originalUrlCheck = true;
    $scope.loadingStatus = false;
    $scope.previewImage = "";
    $scope.errorImage = false;
    $scope.loadingImage = false;
    $scope.topArea = {
        'message': 'You are creating a new entity',
        'status': 'info'
    };
    $scope.typeFilter = {'label': ""};
    $scope.imageUrlErrorMessage = "Invalid URL";
    $scope.imageUrlTooltipeMessage = "Depiction URL";
    $scope.imageUrlHasError = false;
    $scope.typesHasError = false;
    $scope.typesErrorMessage = "You must select at least one type";
    $scope.typesTooltipeMessage = "Select at least one type";

    $scope.searchOnResourcePanel = function($event, searchType) {
        var triple = {
            subject: null,
            predicate: null,
            object: null
        };
        var resourcePanelFooterButtonsOverride = {
            showCopyInEditorButton: false,
            showUseAndCopy: false,
            showNewButton: false
        };
        ResourcePanel.showItemsForSubject(triple, $event.target, undefined, resourcePanelFooterButtonsOverride).then(function(item, fixed) {
            var innerCopyFromLOD = function() {
                $scope.tabs = [];
                $scope.disactiveLanguages = [];
                if (typeof item.providerFrom === 'string' && item.providerFrom === 'korbo') {
                    // Reload item from korbo to get custom fields also.
                    buildLanguagesModel(item.id, item.providerFrom, {
                        originalUrl: item.uri,
                        imageUrl: item.image
                    });

                }
                else {
                    // Rebuild interface from search result item.
                    var storedItem = ItemsExchange.getItemByUri(item.uri);
                    if (typeof storedItem !== 'undefined') {
                        $scope.tabs = [];
                        $scope.disactiveLanguages = [];

                        $scope.imageUrl = storedItem.image || '';
                        $scope.originalUrl = storedItem.uri || '';
                        initTypes();
                        buildTypesFromArray(storedItem.type);
                        buildTypesFromConfiguration();

                        var language = storedItem.language || $scope.conf.defaultLanguage;

                        var tempLang = {};
                        tempLang[language.toLowerCase()] = true;

                        var langObj = {
                            'title': language.toUpperCase(),
                            'name': language.toLowerCase(),
                            'description': storedItem.description,
                            'label': storedItem.label,
                            'mandatory': true,
                            'hasError': false,
                            'tooltipMessageTitle': tooltipMessageTitle + language.toLowerCase(),
                            'tooltipMessageDescription': tooltipMessageDescription + language.toLowerCase(),
                            'tooltipMessageError': "message",
                            'tooltipMessageErrorTab': "There are some errors in the " + language.toLowerCase() + " languages fields"
                        };
                        $scope.tabs.push(langObj);
                        pushCurrentLang(langObj);

                        angular.forEach($scope.conf.languages, function(lang) {
                            if (!tempLang.hasOwnProperty(lang.value.toLowerCase())) {
                                var langObj = {
                                    'title': lang.value.toUpperCase(),
                                    'name': lang.name.toLowerCase(),
                                    'description': "",
                                    'label': "",
                                    'mandatory': true,
                                    'hasError': false,
                                    'tooltipMessageTitle': tooltipMessageTitle + lang.name.toLowerCase(),
                                    'tooltipMessageDescription': tooltipMessageDescription + lang.name.toLowerCase(),
                                    'tooltipMessageError': "message",
                                    'tooltipMessageErrorTab': "There are some errors in the " + lang.name.toLowerCase() + " languages fields"
                                };
                                $scope.disactiveLanguages.push(langObj);
                            }
                        });

                        $scope.topArea = {
                            'message': 'You are editing the entity...',
                            'status': 'info'
                        };
                        $scope.loadingStatus = false;
                    }
                }
            }
            if (typeof item !== 'undefined' && typeof item.uri !== 'undefined') {
                switch(searchType) {
                    case 'original-url':
                        $scope.originalUrl = item.uri;
                        //Breadcrumbs.itemSelect($scope.conf.breadcrumbName, (Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 2));
                        break;
                    case 'copy-from-lod':
                        if (Config.annotationServerCallsNeedLoggedUser) {
                            MyPundit.checkLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    innerCopyFromLOD();
                                }
                                else {
                                    EventDispatcher.sendEvent('MyPundit.userNeedToLogin');
                                }
                            });
                        }
                        else {
                            innerCopyFromLOD();
                        }
                        break;
                }
            }
        });
    }

    $scope.updateTypes = function () {
        var count = 0;
        for (var i in $scope.types) {
            if ($scope.types[i].checked) {
                count++;
            }
        }
        if ($scope.saveClicked) {
            if (count === 0) {
                $scope.typesHasError = true;
            }
            else {
                $scope.typesHasError = false;
            }
        }

        return count;
    };

    // return true if url is valid, false otherwise
    $scope.checkUrl = function () {
        if ($scope.imageUrl === '' || urlPattern.test($scope.imageUrl)) {
            if ($scope.saveClicked) {
                $scope.imageUrlHasError = false;
            }

            return true;
        }
        else {
            if ($scope.saveClicked) {
                $scope.imageUrlHasError = true;
            }

            return false;
        }
    };

    $scope.updateTitleField = function (index) {

        if ($scope.tabs[index].label === '') {
            $scope.tabs[index].tooltipMessageError = errorMandatory;
        }
        else {
            if ($scope.tabs[index].label !== '' && $scope.tabs[index].label.length < $scope.conf.labelMinLength) {
                $scope.tabs[index].tooltipMessageError = errorLabelTooShort;
            }
            else {
                if ($scope.tabs[index].label !== '' && $scope.tabs[index].label.length >= $scope.conf.labelMinLength) {
                    $scope.tabs[index].hasError = false;
                }
            }
        }
        /* DEPRECATED */
        //updateBreadcrumbFirstItem();
        updateEntityTitlePreview();
    };

    $scope.save = function() {
        $scope.saveClicked = true;
        if (Config.annotationServerCallsNeedLoggedUser) {
            MyPundit.checkLoggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    doSave();
                }
                else {
                    $scope.saveClicked = false;
                    EventDispatcher.sendEvent('MyPundit.userNeedToLogin');
                }
            });
        }
        else {
            doSave();
        }
    }

    $scope.clearForm = function () {
        $scope.saveClicked = false;
        // reset all title and description for each languages
        for (var l = 0; l < $scope.tabs.length; l++) {
            (function (index) {
                $scope.tabs[index].label = "";
                $scope.tabs[index].description = "";
                $scope.tabs[index].hasError = false;

            })(l);
        } // end for

        initTypes();
        buildTypesFromConfiguration();

        // reset image url
        $scope.imageUrl = "";
        $scope.originalUrl = "";
        KorboCommunicationService.setEntityToCopy(null);
        $scope.topArea.message = "You are creating a new entity";
        $scope.topArea.status = "info";
    };

    $scope.$watch('imageUrl', function (val) {
        if (val !== '' && urlPattern.test(val)) {
            if (typeof $scope.conf.resourceProxy != 'undefined') {
                val = $scope.conf.resourceProxy + '?url=' + val;
            }
            $timeout.cancel(timer);
            timer = $timeout(function () {
                $scope.loadingImage = true;
                $http({
                    headers: {'Accept': 'image/webp,*/*;q=0.8'},
                    method: 'HEAD',
                    withCredentials: $scope.conf.useCredentialInHttpCalls,
                    url: val,
                    cache: false
                }).success(function () {
                    $scope.showImg = true;
                    $scope.previewImage = val;
                    $scope.errorImage = false;
                    $scope.loadingImage = false;
                }).error(function () {
                    $scope.showImg = false;
                    $scope.errorImage = true;
                    $scope.loadingImage = false;
                });
            }, 1000);

            // if input type is empty
        }
        else {
            $scope.showImg = false;
            $scope.errorImage = false;
            $scope.loadingImage = false;
        }
    });

    $scope.addLanguage = function (lang) {
        var langIndex = $scope.disactiveLanguages.indexOf(lang);
        $scope.disactiveLanguages.splice(langIndex, 1);
        $scope.tabs.push(lang);
        addActionToContextualMenu(lang);
        if ($scope.tabs.length === 2) {
            ContextualMenu.modifyDisabled('rml' + $scope.tabs[0].name, false);
        }
    };

    $scope.removeLanguage = function (lang) {
        var langIndex = $scope.tabs.indexOf(lang);
        $scope.tabs.splice(langIndex, 1);
        $scope.disactiveLanguages.push(lang);
        ContextualMenu.removeActionByName('rml' + lang.name);
        if ($scope.tabs.length < 2) {
            ContextualMenu.modifyDisabled('rml' + $scope.tabs[0].name, true);
        }
    };

    $scope.showDropdown = function ($event) {
        var resource = {name: 'resourceName'};
        ContextualMenu.show($event.pageX, $event.pageY, resource, 'advancedMenu');
        /*
        var app = angular.element('[data-ng-app="Pundit2"]');
        var appBox = app[0].getBoundingClientRect();
        var element = event.target;
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var deltaX = box.left + window.pageXOffset - de.clientLeft - appBox.left;
        var deltaY = $event.originalEvent.clientY - Math.abs($event.originalEvent.layerY);

        ContextualMenu.show(deltaX, deltaY, resource, 'advancedMenu');
        */
        $event.stopPropagation();
    };

    $scope.typesMouseLeave = function () {
        $timeout.cancel(delay);
        delay = $timeout(function () {
            $scope.activeFilter = false;
            $scope.typeFilter.label = '';
        }, 1000);
    };

    $scope.typesMouseEnter = function () {
        $timeout.cancel(delay);
    };

    $scope.removeImage = function () {
        // reset image url
        $scope.imageUrl = "";
    };

    $scope.activeAllTypes = function () {
        for (var t in $scope.types) {
            $scope.types[t].checked = true;
        }
    };

    $scope.disableAllTypes = function () {
        for (var t in $scope.types) {
            $scope.types[t].checked = false;
        }
    };

    $scope.selectedTypes = function() {
        if (typeof $scope.types === 'undefined') {
            return [];
        }
        return $scope.types.filter(function(element, index, array){
            return element.checked;
        });
    }

    //entityToCreate
    $scope.$watch(function () {
        return KorboCommunicationService.getEntityToCopy();
    }, function (entity) {
        if (entity !== null) {

            if (!$scope.editMode || copyCheck) {
                ContextualMenu.wipeActionsByType('advancedMenu');
                buildContextualMenu();
                $scope.tabs = [];
                $scope.disactiveLanguages = [];

                buildLanguagesModel(entity.uri, entity.providerFrom);

                copyCheck = false;
            }
            else {
                $scope.originalUrl = entity.resource;
            }
        }

    });

    $scope.openWindow = function (url) {
        if (typeof(url) !== 'undefined' && url !== null) {
            $window.open(url);
        }

    };

    $window[$scope.conf.globalObjectName].onCancel(function () {
        ContextualMenu.wipeActionsByType('advancedMenu');
    });

    var resourcePanelLastPromise = ResourcePanel.lastPromiseThen;
    ResourcePanel.hide();

    // Init actions.
    if ($scope.conf.tripleComposerEnabled) {
        TripleComposer.reset(korboConf.tripleComposerName);
    }

    buildContextualMenu();

    if (typeof($scope.idEntityToEdit) !== 'undefined' && $scope.idEntityToEdit !== null) {
        if (Config.annotationServerCallsNeedLoggedUser) {
            MyPundit.checkLoggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    buildLanguagesModel($scope.idEntityToEdit, 'korbo');
                }
                else {
                    var eventHandler = EventDispatcher.addListener('MyPundit.isUserLogged', function(isUserLogged) {
                        if (typeof isUserLogged.args !== 'undefined') {
                            isUserLogged = isUserLogged.args;
                        }
                        if (isUserLogged) {
                            EventDispatcher.removeListener(eventHandler);
                            buildLanguagesModel($scope.idEntityToEdit, 'korbo');
                        }
                    });
                    EventDispatcher.sendEvent('MyPundit.userNeedToLogin');
                }
            });
        }
        else {
            buildLanguagesModel($scope.idEntityToEdit, 'korbo');
        }
    }

    if (!$scope.editMode) {
        initTypes();
        buildLanguageTabs();
        buildTypesFromConfiguration();
    }

    /* DEPRECATED */
    /*
    var discardAdvancedOptionsChanges = function() {
        $scope.imageUrl = revertStore.advancedOptions.imageUrl;
        $scope.originalUrl = revertStore.advancedOptions.originalUrl;
        $scope.types = angular.copy(revertStore.advancedOptions.types);
        delete revertStore.advancedOptions;
    }
    */

    /* DEPRECATED */
    /*
    var backupAdvancedOptions = function() {
        revertStore.advancedOptions = {
            imageUrl: $scope.imageUrl,
            originalUrl: $scope.originalUrl,
            types: angular.copy($scope.types)
        };
    }
    */

    /* DEPRECATED */
    /*
    var backupTripleComposer = function() {
        var statements = TripleComposer.getStatements();
        revertStore.tripleComposer = {
            statements: []
        };
        angular.forEach(statements, function(statement) {
            if (!statement.scope.isStatementComplete()) {
                return;
            }
            var statementObject = angular.copy(statement.scope.get());
            revertStore.tripleComposer.statements.push(statementObject);
        });
    }
    */

    /* DEPRECATED */
    /*
    $scope.showAdvancedOptions = function() {
        //Breadcrumbs.appendItem($scope.conf.breadcrumbName, {
        //    name: 'advancedOption',
        //    unique: true,
        //    label: 'Advanced options',
        //    callback: function() {
        //        setCurrentInnerPane('advancedOptions');
        //        KorboCommunicationService.setSearchConf('tab');
        //        backupAdvancedOptions();
        //    }
        //});
        setCurrentInnerPane('advancedOptions');
        KorboCommunicationService.setSearchConf('tab');
        backupAdvancedOptions();
    }
    /*

    /* DEPRECATED */
    /*
    $scope.closeAdvancedOptions = function(confirmChanges) {
        //setCurrentInnerPane('simpleOptions');
        if (!confirmChanges) {
            discardAdvancedOptionsChanges();
        }
        setCurrentInnerPane('simpleOptions');
        //Breadcrumbs.itemSelect($scope.conf.breadcrumbName, Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 2);
    }
    */

    /* DEPRECATED */
    /*
    $scope.showTripleComposer = function () {
        TripleComposer.initContextualMenu();
        Breadcrumbs.appendItem($scope.conf.breadcrumbName, {
            label: 'Triple composer',
            callback: function () {
                addEntityToAllSubjects();
                backupTripleComposer();
                setCurrentInnerPane('tripleComposer');
            }
        });
        addEntityToAllSubjects();
        backupTripleComposer();
        setCurrentInnerPane('tripleComposer');
    }
    */

    /* DEPRECATED */
    /*
    $scope.closeTripleComposer = function(confirmChanges) {
        //setCurrentInnerPane('simpleOptions');
        if (!confirmChanges) {
            discardTripleComposerChanges();
        }
        Breadcrumbs.itemSelect($scope.conf.breadcrumbName, Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 2);
    }
    */



    /* DEPRECATED */
    /*
    $scope.searchOriginalURL = function($event) {

        Breadcrumbs.appendItem($scope.conf.breadcrumbName, {
            label: 'Search original URL',
            name: 'search',
            unique: true,
            callback: function() {
                setCurrentInnerPane('SearchURL');
                // Override breadcrumb label in case of "search" already exists.
                Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 1, 'Search original URL');
            }
        });
        setCurrentInnerPane('SearchURL');
        // Override breadcrumb label in case of "search" already exists.
        Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, Breadcrumbs.getItems($scope.conf.breadcrumbName).length - 1, 'Search original URL');

    }
     */






    /* DEPRECATED */
    /*
    // set default language
    $scope.defaultLan = $scope.conf.languages[0];
    for (var j in $scope.conf.languages) {
        if ($scope.conf.languages[j].state === true) {
            $scope.defaultLan = $scope.conf.languages[j];
            break;
        } // end if
    } // end for
    */




    // tooltip message for image url





    /* DEPRECATED */
    /*
    var updateEntityTitlePreview = function() {
        //Breadcrumbs.setItemLabel($scope.conf.breadcrumbName, 0, $scope.tabs[0].label);

        var newLabel = $scope.tabs[0].label;
        var charLimit = 25;
        if (typeof charLimit === 'number') {
            charLimit = charLimit < 4 ? 4 : charLimit;
            if (newLabel.length > charLimit) {
                newLabel = newLabel.substr(0, charLimit) + '...';
            }
        }

        newLabel = newLabel.length == 0 ? 'Entity title' : newLabel;
        $scope.entityTitle = newLabel;
    }
    */












    // Add first item in breadcrumbs.
    /* DEPRECATED */
    /*
    Breadcrumbs.appendItem($scope.conf.breadcrumbName, {
        label: '',
        placeholder: 'Entity title',
        charLimit: 15,
        charLimitAsLast: 40,
        callback: function() {
            if ($scope.innerPanes.current == 'advancedOptions') {
                discardAdvancedOptionsChanges();
            }
            setCurrentInnerPane('simpleOptions');
        }
    });
    */

});

