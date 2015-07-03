angular.module('Pundit2.GeneralItemsContainer')

.constant('GENERALITEMSCONTAINER', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#GeneralItemsContainer
     *
     * @description
     * `object`
     *
     * Configuration object for GeneralItemsContainer module. 
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#GeneralItemsContainer.myItemsType
     *
     * @description
     * `string`
     *
     * Type myitems
     *
     * Default value:
     * <pre> myItemsType: 'myItems' </pre>
     */
    myItemsType: 'myItems',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#GeneralItemsContainer.pageItemsType
     *
     * @description
     * `string`
     *
     * Type pageitems
     *
     * Default value:
     * <pre> pageItemsType: 'pageItems' </pre>
     */
    pageItemsType: 'pageItems',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#GeneralItemsContainer.vocabulariesType
     *
     * @description
     * `string`
     *
     * Type vocabularies
     *
     * Default value:
     * <pre> vocabulariesType: 'vocabularies' </pre>
     */
    vocabulariesType: 'vocabularies',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#GeneralItemsContainer.myNotebooksType
     *
     * @description
     * `string`
     *
     * Type mynotebooks
     *
     * Default value:
     * <pre> myNotebooksType: 'myNotebooks' </pre>
     */
    myNotebooksType: 'myNotebooks',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#GeneralItemsContainer.predicatesType
     *
     * @description
     * `string`
     *
     * Type predicates
     *
     * Default value:
     * <pre> predicatesType: 'predicates' </pre>
     */
    predicatesType: 'predicates'

})

.service('GeneralItemsContainer', function(GENERALITEMSCONTAINER, BaseComponent, MyItemsContainer, PageItemsContainer, SelectorsManager, MyNotebooksContainer, NotebookExchange, PredicatesContainer, VocabulariesContainer, Config, ItemsExchange) {

    var generalItemsContainer = new BaseComponent('GeneralItemsContainer', GENERALITEMSCONTAINER);

    var MY_ITEMS_TYPE = generalItemsContainer.options.myItems;
    var PAGE_ITEMS_TYPE = generalItemsContainer.options.pageItemsType;
    var VOCABULARIES_TYPE = generalItemsContainer.options.vocabulariesType;
    var MY_NOTEBOOKS_TYPE = generalItemsContainer.options.myNotebooksType;
    var PREDICATES_TYPE = generalItemsContainer.options.predicatesType;

    //return the correct manager associated to the type
    generalItemsContainer.getManager = function(type) {
        if (type === MY_ITEMS_TYPE) {
            return MyItemsContainer;
        } else if (type === PAGE_ITEMS_TYPE) {
            return PageItemsContainer;
        } else if (type === VOCABULARIES_TYPE) {
            return VocabulariesContainer;
        } else if (type === MY_NOTEBOOKS_TYPE) {
            return MyNotebooksContainer;
        } else if (type === PREDICATES_TYPE) {
            return PredicatesContainer;
        }
        //default myitems
        return MyItemsContainer;
    };

    generalItemsContainer.getMessage = function(type) {

        var text = '';
        if (generalItemsContainer.isMyItemsType(type)) {
            text = 'No my items found.';
        } else if (generalItemsContainer.isPageItemsType(type)) {
            text = 'No page items found.';
        } else if (generalItemsContainer.isVocabulariesType(type)) {
            text = 'Enter text to search in the vocabularies.';
        } else if (generalItemsContainer.isMyNotebooksType(type)) {
            text = 'No notebooks found.';
        } else if (generalItemsContainer.isPredicatesType(type)) {
            text = 'No predicates found.';
        }

        var message = {
            // show or not
            flag: true,
            // text to show
            text: text
        };

        return message;
    };

    generalItemsContainer.getTabs = function(type) {
        var tabs = [];
        if (generalItemsContainer.isPredicatesType(type) || generalItemsContainer.isMyNotebooksType(type)) {
            return tabs;
        }
        if (!generalItemsContainer.isVocabulariesType(type)) {
            // tabs used to filter items list by type (all, text, image and pages)
            tabs = [{
                title: 'All Items',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function() {
                    return true;
                }
            }, {
                title: 'Text',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function(item) {
                    return item.isTextFragment();
                }
            }, {
                title: 'Images',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function(item) {
                    return item.isImage() || item.isImageFragment();
                }
            }, {
                title: 'Entities',
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function(item) {
                    return item.isEntity();
                }
            }, {
                title: 'Pages',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function(item) {
                    return item.isWebPage();
                }
            }];
        } else {
            // build tabs by reading active selectors inside selectors manager
            var selectors = SelectorsManager.getActiveSelectors();
            for (var j in selectors) {
                tabs.push({
                    title: selectors[j].config.label,
                    template: 'src/Lists/itemList.tmpl.html',
                    itemsContainer: selectors[j].config.container
                });
            }
        }

        return tabs;

    };


    generalItemsContainer.getMessageText = function(type, str) {

        var text = '';
        if (generalItemsContainer.isMyItemsType(type)) {
            if (str === '') {
                return "No item found.";
            } else {
                return "No item found to: " + str;
            }
        } else if (generalItemsContainer.isPageItemsType(type)) {
            if (str === '') {
                return "No page item found.";
            } else {
                return "No page item found to: " + str;
            }
        } else if (generalItemsContainer.isVocabulariesType(type)) {
            if (str === '') {
                return "No vocabulary found.";
            } else {
                return "No vocabulary found to: " + str;
            }
        } else if (generalItemsContainer.isMyNotebooksType(type)) {
            if (str === '') {
                return "No notebook found.";
            } else {
                return "No notebook found to: " + str;
            }
        } else if (generalItemsContainer.isPredicatesType(type)) {
            if (str === '') {
                return "No predicate found.";
            } else {
                return "No predicate found to: " + str;
            }
        }


        return text;
    };


    generalItemsContainer.getSearch = function(type) {

        var icon = generalItemsContainer.getManager(type).options.inputIconSearch;
        var term = '';
        var orderLabel = '';
        var placeholder = '';

        if (generalItemsContainer.isMyItemsType(type)) {
            orderLabel = 'Order my items';
        } else if (generalItemsContainer.isPageItemsType(type)) {
            orderLabel = 'Order page items';
        } else if (generalItemsContainer.isVocabulariesType(type)) {
            orderLabel = 'Order vocabularies';
        } else if (generalItemsContainer.isMyNotebooksType(type)) {
            orderLabel = 'Order my notebooks';
            placeholder = 'search notebooks';
        } else if (generalItemsContainer.isPredicatesType(type)) {
            orderLabel = 'Order predicates';
            placeholder = 'search property';
        }
        var search = {
            icon: icon,
            term: term,
            placeholder: placeholder,
            orderLabel: orderLabel
        };

        if (generalItemsContainer.isVocabulariesType(type)) {
            search.additionalClass = 'vocab-items-btn-order';
        }
        return search;
    };

    generalItemsContainer.getActionButton = function(type) {
        var title = '';
        var text = '';
        var action = '';
        var requireLoggedUser = true;
        var btnClass = 'pnd-triplecomposer-cancel btn btn-info btn-xs pnd-btn-full';

        if (generalItemsContainer.isMyItemsType(type)) {
            title = 'Remove from my items';
            text = 'Remove';
            action = 'remove';
        } else if (generalItemsContainer.isPageItemsType(type)) {
            title = 'Add to myItems';
            text = 'Add to myItems';
            action = 'add';
        } else if (generalItemsContainer.isVocabulariesType(type)) {
            title = 'Add to myItems';
            text = 'Add to myItems';
            action = 'add';
            requireLoggedUser = false;
        } else if (generalItemsContainer.isMyNotebooksType(type)) {
            title = 'Create new notebook';
            text = 'Create new notebook';
            requireLoggedUser = false;
            btnClass = 'btn btn-xs btn-success pnd-btn-full my-notebooks-btn-new';
        } else if (generalItemsContainer.isPredicatesType(type)) {
            title = 'Use as predicate';
            text = 'Set predicate';
            requireLoggedUser = false;
            btnClass = 'pnd-triplecomposer-cancel btn btn-predicate btn-xs pnd-btn-full';
        }

        var actionButton = {
            title: title,
            text: text,
            action: action,
            btnClass: btnClass,
            requireLoggedUser: requireLoggedUser
        };

        return actionButton;
    };

    generalItemsContainer.getOrderButtonClass = function(type) {
        if (generalItemsContainer.isMyNotebooksType(type)) {
            return '.my-notebooks-btn-order';
        } else if (generalItemsContainer.isPredicatesType(type)) {
            return '.predicates-items-btn-order';
        }
        return '';
    };

    generalItemsContainer.itemsUpdateWatchFunction = function(type) {
        if (generalItemsContainer.isMyNotebooksType(type)) {
            return NotebookExchange.getMyNotebooks();
        } else if (generalItemsContainer.isPredicatesType(type)) {
            return ItemsExchange.getItemsByContainer(Config.modules.Client.relationsContainer);
        } else if (generalItemsContainer.isMyItemsType(type) || generalItemsContainer.isPageItemsType(type)) {
            var ContainerManager = getManager(type);
            ItemsExchange.getItemsByContainer(ContainerManager.options.container);
        }

        return;
    };

    generalItemsContainer.isMyItemsType = function(type) {
        return type === MY_ITEMS_TYPE;
    };

    generalItemsContainer.isPageItemsType = function(type) {
        return type === PAGE_ITEMS_TYPE;
    };

    generalItemsContainer.isVocabulariesType = function(type) {
        return type === VOCABULARIES_TYPE;
    };

    generalItemsContainer.isMyNotebooksType = function(type) {
        return type === MY_NOTEBOOKS_TYPE;
    };

    generalItemsContainer.isPredicatesType = function(type) {
        return type === PREDICATES_TYPE;
    };

    return generalItemsContainer;
});