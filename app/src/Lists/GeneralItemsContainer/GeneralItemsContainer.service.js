angular.module('Pundit2.GeneralItemsContainer')


.service('GeneralItemsContainer', function(MyItemsContainer, PageItemsContainer, SelectorsManager) {

    var MY_ITEMS_TYPE = 'myItems';
    var PAGE_ITEMS_TYPE = 'pageItems';
    var VOCABULARIES_TYPE = 'vocabularies';

    //return the correct manager associated to the type
    var getManager = function(type){
        if(type === MY_ITEMS_TYPE){
            return MyItemsContainer;
        }else if(type === PAGE_ITEMS_TYPE){
            return PageItemsContainer;
        }else if(type === VOCABULARIES_TYPE){
            return SelectorsManager;
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
        if(!isVocabulariesType(type)) {
            // tabs used to filter items list by type (all, text, image and pages)
            var tabs = [{
                //TODO: title: 'All items' in PageItemsContainer controller. Can we use only one of them?
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


    var getSearch = function(type){

        var icon = getManager(type).options.inputIconSearch;
        var term = '';
        var orderLabel = '';
        if(isMyItemsType(type)){
            orderLabel = 'Order my items';
        }else if(isPageItemsType(type)){
            orderLabel = 'Order page items';
        }else if(isVocabulariesType(type)){
            orderLabel = 'Order vocabularies';
        }
        var search = {
            icon: icon,
            term: term,
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

    var isMyItemsType = function(type){
        return type === MY_ITEMS_TYPE;
    }

    var isPageItemsType = function(type){
        return type === PAGE_ITEMS_TYPE;
    }

    var isVocabulariesType = function(type){
        return type === VOCABULARIES_TYPE;
    }


    return {
        getManager: getManager,
        getMessage: getMessage,
        getTabs: getTabs,
        getSearch: getSearch,
        getActionButton: getActionButton,
        isMyItemsType: isMyItemsType,
        isPageItemsType: isPageItemsType,
        isVocabulariesType: isVocabulariesType
    }


});