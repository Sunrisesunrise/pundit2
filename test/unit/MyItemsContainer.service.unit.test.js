ddescribe("MyItemsContainer", function(){

    var MyItemsContainer,
        $rootScope,
        $compile;

    beforeEach(module('Pundit2'));

    beforeEach(module(
        'src/Lists/itemList.tmpl.html'
    ));

    beforeEach(inject(function(_$rootScope_, _$compile_, _MyItemsContainer_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        MyItemsContainer = _MyItemsContainer_;
    }));

    /*var compileDirective = function(){
        var elem = $compile('<page-item-container></page-item-container>')($rootScope);
        angular.element('body').append(elem);
        $rootScope.$digest();
        return elem;
    };*/

    /*afterEach(function(){
        angular.element('page-item-container').remove();
    });*/

    it('should correctly initialize', function(){
        expect(MyItemsContainer.buildItemsArray).toBeDefined();
        expect(MyItemsContainer.getItemsArrays).toBeDefined();
        expect(MyItemsContainer.getItemsArrays().length).toBe(0);
    });

});