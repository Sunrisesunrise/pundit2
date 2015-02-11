describe("Item interaction", function() {
    var p = protractor.getInstance();

    beforeEach(function(){
        p.get('/app/examples/keyboard.html');
    });

    it("should correctly register and unregister event handlers", function(){

        // Register
        p.findElement(protractor.By.id('btn-register-default')).click();

        p.findElements(protractor.By.css('.event-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(0);
        });

        // Unregister
        p.findElement(protractor.By.id('btn-unregister-default')).click();

        p.findElements(protractor.By.css('.event-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(1);
        });

        // Register again
        p.findElement(protractor.By.id('btn-register-default')).click();

        p.findElements(protractor.By.css('.event-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(0);
        });

        // Register high priority handlers
        p.findElement(protractor.By.id('btn-register-hp')).click();

        p.findElements(protractor.By.css('li.hpkey.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(0);
        });

    });

});