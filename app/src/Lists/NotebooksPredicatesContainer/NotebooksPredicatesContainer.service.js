angular.module('Pundit2.NotebooksPredicatesContainer')

.service('NotebooksPredicatesContainer', function(MyNotebooksContainer, NotebookExchange, PredicatesContainer, Config, ItemsExchange) {

    var MY_NOTEBOOKS_TYPE = 'myNotebooks';
    var PREDICATES_TYPE = 'predicates';

    //return the correct manager associated to the type
    var getManager = function(type){
        if(type === MY_NOTEBOOKS_TYPE){
            return MyNotebooksContainer;
        }else if(type === PREDICATES_TYPE){
            return PredicatesContainer;
        }
        //default notebooks
        return MyNotebooksContainer;
    }

    var getMessage = function(type){

        var text = '';
        if(isMyNotebooksType(type)){
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

    var getMessageText = function(type, str){

        var text = '';
        if(isMyNotebooksType(type)){
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

        var icon = 'pnd-icon-search';
        var term = '';
        var orderLabel = '';
        var placeholder = '';

        if(isMyNotebooksType(type)){
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

        return search;
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
        }
        return;
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
        getSearch: getSearch,
        getOrderButtonClass: getOrderButtonClass,
        itemsUpdateWatchFunction: itemsUpdateWatchFunction,
        isMyNotebooksType: isMyNotebooksType,
        isPredicatesType: isPredicatesType
    }


});