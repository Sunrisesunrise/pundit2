angular.module('Pundit2.GeneralItemsContainer')


.service('GeneralItemsContainer', function(MyItemsContainer, PageItemsContainer, SelectorsManager, MyNotebooksContainer, NotebookExchange, PredicatesContainer, Config, ItemsExchange) {


    var MY_ITEMS_TYPE = 'myItems';
    var PAGE_ITEMS_TYPE = 'pageItems';
    var VOCABULARIES_TYPE = 'vocabularies';
    var MY_NOTEBOOKS_TYPE = 'myNotebooks';
    var PREDICATES_TYPE = 'predicates';

    //return the correct manager associated to the type
    var getManager = function(type){
        if(type === MY_ITEMS_TYPE){
            return MyItemsContainer;
        }else if(type === PAGE_ITEMS_TYPE){
            return PageItemsContainer;
        }else if(type === VOCABULARIES_TYPE){
            return SelectorsManager;
        }else if(type === MY_NOTEBOOKS_TYPE){
            return MyNotebooksContainer;
        }else if(type === PREDICATES_TYPE){
            return PredicatesContainer;
        }
        //default myitems
        return MyItemsContainer;
    }

    var getMessage = function(type){

        var text = '';
        if(isMyItemsType(type)){
            text = 'No my items found.';
        }else if(isPageItemsType(type)){
            text = 'No page items found.';
        }else if(isVocabulariesType(type)){
            text = 'Enter text to search in the vocabularies.';
        } else if(isMyNotebooksType(type)){
            text = 'No notebooks found.';
        }else if(isPredicatesType(type)){
            text = 'No predicates found.';
        }

        var message = {
            // show or not
            flag: true,
            // text to show
            text: text
        };

        return message;
    }

    var getTabs = function(type){
        var tabs = [];
        if(isPredicatesType(type) || isMyNotebooksType(type)){
            return tabs;
        }
        if(!isVocabulariesType(type)) {
            // tabs used to filter items list by type (all, text, image and pages)
            var tabs = [{
                title: 'All Items',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function () {
                    return true;
                }
            }, {
                title: 'Text',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function (item) {
                    return item.isTextFragment();
                }
            }, {
                title: 'Images',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function (item) {
                    return item.isImage() || item.isImageFragment();
                }
            }, {
                title: 'Entities',
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function (item) {
                    return item.isEntity();
                }
            }, {
                title: 'Pages',
                // this is the centralized template to items list
                template: 'src/Lists/itemList.tmpl.html',
                filterFunction: function (item) {
                    return item.isWebPage();
                }
            }];
        }else{
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

    }


    var getMessageText = function(type, str){

        var text = '';
        if(isMyItemsType(type)){
            if (str === '') {
                return "No item found.";
            } else {
                return "No item found to: " + str;
            }
        }else if(isPageItemsType(type)){
            if (str === '') {
                return "No page item found.";
            } else {
                return "No page item found to: " + str;
            }
        } else if(isVocabulariesType(type)){
            if (str === '') {
                return "No vocabulary found.";
            } else {
                return "No vocabulary found to: " + str;
            }
        }else if(isMyNotebooksType(type)){
            if (str === '') {
                return "No notebook found.";
            } else {
                return "No notebook found to: " + str;
            }
        }else if(isPredicatesType(type)){
            if (str === '') {
                return "No predicate found.";
            } else {
                return "No predicate found to: " + str;
            }
        }


        return text;
    }


    var getSearch = function(type){

        var icon = getManager(type).options.inputIconSearch;
        var term = '';
        var orderLabel = '';
        var placeholder = '';

        if(isMyItemsType(type)){
            orderLabel = 'Order my items';
        }else if(isPageItemsType(type)){
            orderLabel = 'Order page items';
        }else if(isVocabulariesType(type)){
            orderLabel = 'Order vocabularies';
        } else if(isMyNotebooksType(type)){
            orderLabel = 'Order my notebooks';
            placeholder = 'search notebooks';
        }else if(isPredicatesType(type)){
            orderLabel = 'Order predicates';
            placeholder = 'search property';
        }
        var search = {
            icon: icon,
            term: term,
            placeholder: placeholder,
            orderLabel: orderLabel
        };

        if(isVocabulariesType(type)){
            search.additionalClass = 'vocab-items-btn-order';
        }
        return search;
    }

    var getActionButton = function(type){
        var title = '';
        var text = '';
        var action = '';
        var requireLoggedUser = true;
        if(isMyItemsType(type)){
            title = 'Remove from my items';
            text = 'Remove';
            action = 'remove';
        }else if(isPageItemsType(type)){
            title = 'Add to myItems';
            text = 'Add to myItems';
            action = 'add';
        }else if(isVocabulariesType(type)){
            title = 'Add to myItems';
            text = 'Add to myItems';
            action = 'add';
            requireLoggedUser = false;
        }

        var actionButton = {
            title: title,
            text: text,
            action: action,
            requireLoggedUser: requireLoggedUser
        }

        return actionButton;
    }

    var getOrderButtonClass = function(type){
        if(isMyNotebooksType(type)){
            return '.my-notebooks-btn-order';
        }else if(isPredicatesType(type)){
            return '.predicates-items-btn-order';
        }
        return '';
    }

    var itemsUpdateWatchFunction = function(type){
        if(isMyNotebooksType(type)){
            return NotebookExchange.getMyNotebooks();
        } else if(isPredicatesType(type)){
            return ItemsExchange.getItemsByContainer(Config.modules.Client.relationsContainer);
        } else if(isMyItemsType(type) || isPageItemsType(type)){
            var ContainerManager = getManager(type);
            ItemsExchange.getItemsByContainer(ContainerManager.options.container);
        }

        return;
    }

    var isMyItemsType = function(type){
        return type === MY_ITEMS_TYPE;
    }

    var isPageItemsType = function(type){
        return type === PAGE_ITEMS_TYPE;
    }

    var isVocabulariesType = function(type){
        return type === VOCABULARIES_TYPE;
    }

    var isMyNotebooksType = function(type){
        return type === MY_NOTEBOOKS_TYPE;
    }

    var isPredicatesType = function(type){
        return type === PREDICATES_TYPE;
    }


    return {
        getManager: getManager,
        getMessage: getMessage,
        getMessageText: getMessageText,
        getTabs: getTabs,
        getSearch: getSearch,
        getActionButton: getActionButton,
        getOrderButtonClass: getOrderButtonClass,
        itemsUpdateWatchFunction: itemsUpdateWatchFunction,
        isMyItemsType: isMyItemsType,
        isPageItemsType: isPageItemsType,
        isVocabulariesType: isVocabulariesType,
        isMyNotebooksType: isMyNotebooksType,
        isPredicatesType: isPredicatesType
    }


});