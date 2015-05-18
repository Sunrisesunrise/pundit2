describe("GeneralItemsContainer", function(){

    var GeneralItemsContainer,
        $rootScope,
        $compile,
        MyItemsContainer, PageItemsContainer, SelectorsManager, MyNotebooksContainer, PredicatesContainer, VocabulariesContainer;

    beforeEach(module('Pundit2'));

    beforeEach(module(
        'src/Lists/itemList.tmpl.html'
    ));

    beforeEach(inject(function(_$rootScope_, _$compile_, _GeneralItemsContainer_, _MyItemsContainer_, _PageItemsContainer_, _SelectorsManager_, _MyNotebooksContainer_, _PredicatesContainer_, _VocabulariesContainer_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        GeneralItemsContainer = _GeneralItemsContainer_;
        MyItemsContainer = _MyItemsContainer_;
        PageItemsContainer = _PageItemsContainer_;
        SelectorsManager = _SelectorsManager_;
        MyNotebooksContainer = _MyNotebooksContainer_;
        PredicatesContainer = _PredicatesContainer_;
        VocabulariesContainer = _VocabulariesContainer_;

    }));

    /*var compileDirective = function(){
        var elem = $compile('<general-item-container></general-item-container>')($rootScope);
        angular.element('body').append(elem);
        $rootScope.$digest();
        return elem;
    };*/

    /*afterEach(function(){
        angular.element('general-item-container').remove();
    });*/

    it('should correctly initialize', function(){
        expect(GeneralItemsContainer.getManager).toBeDefined();
        expect(GeneralItemsContainer.getMessage).toBeDefined();
        expect(GeneralItemsContainer.getMessageText).toBeDefined();
        expect(GeneralItemsContainer.getTabs).toBeDefined();
        expect(GeneralItemsContainer.getSearch).toBeDefined();
        expect(GeneralItemsContainer.getActionButton).toBeDefined();
        expect(GeneralItemsContainer.getOrderButtonClass).toBeDefined();
        expect(GeneralItemsContainer.itemsUpdateWatchFunction).toBeDefined();
        expect(GeneralItemsContainer.isMyItemsType).toBeDefined();
        expect(GeneralItemsContainer.isPageItemsType).toBeDefined();
        expect(GeneralItemsContainer.isVocabulariesType).toBeDefined();
        expect(GeneralItemsContainer.isMyNotebooksType).toBeDefined();
        expect(GeneralItemsContainer.isPredicatesType).toBeDefined();
    });


    it('should correctly evaluate type', function(){
        expect(GeneralItemsContainer.isMyItemsType('myItems')).toBeTruthy();
        expect(GeneralItemsContainer.isPageItemsType('pageItems')).toBeTruthy();
        expect(GeneralItemsContainer.isVocabulariesType('vocabularies')).toBeTruthy();
        expect(GeneralItemsContainer.isMyNotebooksType('myNotebooks')).toBeTruthy();
        expect(GeneralItemsContainer.isPredicatesType('predicates')).toBeTruthy();
        expect(GeneralItemsContainer.isMyItemsType('randomString')).toBeFalsy();
        expect(GeneralItemsContainer.isPageItemsType('randomString')).toBeFalsy();
        expect(GeneralItemsContainer.isVocabulariesType('randomString')).toBeFalsy();
        expect(GeneralItemsContainer.isMyNotebooksType('randomString')).toBeFalsy();
        expect(GeneralItemsContainer.isPredicatesType('randomString')).toBeFalsy();
    });

    it('should return correct container manager', function(){
        expect(GeneralItemsContainer.getManager('myItems') === MyItemsContainer).toBeTruthy();
        expect(GeneralItemsContainer.getManager('pageItems') === PageItemsContainer).toBeTruthy();
        expect(GeneralItemsContainer.getManager('vocabularies') === VocabulariesContainer).toBeTruthy();
        expect(GeneralItemsContainer.getManager('myNotebooks') === MyNotebooksContainer ).toBeTruthy();
        expect(GeneralItemsContainer.getManager('predicates') === PredicatesContainer).toBeTruthy();
        //default
        expect(GeneralItemsContainer.getManager('randomString') === MyItemsContainer).toBeTruthy();
        //reverse test
        expect(GeneralItemsContainer.getManager('pageItems') === MyItemsContainer).toBeFalsy();

    });

    it('should return correct tabs', function(){
        //should be empty for predicates and myNotebooks
        expect(GeneralItemsContainer.getTabs('predicates').length === 0).toBeTruthy();
        expect(GeneralItemsContainer.getTabs('myNotebooks').length === 0).toBeTruthy();

        //should be contains exactly 5 items in myItems and pageItems
        expect(GeneralItemsContainer.getTabs('myItems').length === 5).toBeTruthy();
        expect(GeneralItemsContainer.getTabs('pageItems').length === 5).toBeTruthy();

        //should be defined for vocabularies
        expect(GeneralItemsContainer.getTabs('vocabularies')).toBeTruthy();

    });


    it('should return correct action button data', function(){
        expect(GeneralItemsContainer.getActionButton('myItems').requireLoggedUser).toBeTruthy();
        expect(GeneralItemsContainer.getActionButton('pageItems').requireLoggedUser).toBeTruthy();
        expect(GeneralItemsContainer.getActionButton('vocabularies').requireLoggedUser).toBeFalsy();
        expect(GeneralItemsContainer.getActionButton('myNotebooks').requireLoggedUser).toBeFalsy();
        expect(GeneralItemsContainer.getActionButton('predicates').requireLoggedUser).toBeFalsy();
    });

});