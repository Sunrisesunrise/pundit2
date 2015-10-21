describe("The annomatic module", function() {
    var p = browser;
    
    // TODO: mock the datatxt backend with those 25 annotations
    
    it('should load some annotations from datatxt', function() {
        p.get('/app/examples/annomatic.html');

        element(by.css('.pnd-button-suggestion')).click().then(function(){
            p.waitForAngular();
            element.all(by.css('.ann-auto')).then(function(elements) {
                expect(elements.length).toBe(51);
            });
        });
    });

    it('should accept an annotation clicking on accept and removing it by clicking on remove', function() {
        p.get('/app/examples/annomatic.html');
        p.driver.manage().window().setSize(1200, 960);

        // Get annotations
        element(by.css('.pnd-button-suggestion')).click();
        
        // At this time there are no accepted annotations
        element.all(by.css('.ann-ok')).then(function(elements) {
            expect(elements.length).toBe(0);
        });

        // find all suggested annotation, should be 38
        element.all(by.css('.pnd-text-fragment-icon')).then(function(elements) {
            expect(elements.length).toBe(50);

            // click first icon to open preview and menu suggested annotation
            elements[0].click();
            // accept the suggested annotation
            element(by.css('.popover-content .pnd-button-set-ok')).click();
            // now there is 1 accepted annonation
            // element.all(by.css('.ann-ok')).then(function(elements) {
                // TODO adapt annomatic workflow
                // expect(elements.length).toBe(1);
            // });
            // click again first icon to open preview and menu suggested annotation
            elements[0].click();
            // remove accepted annotation

            // TODO adapt annomatic workflow
            // element(by.css('.popover-content .pnd-button-set-ko')).click();
            
            // now there are none accepted annotation
            // element.all(by.css('.ann-ok')).then(function(elements) {
                // TODO adapt annomatic workflow
                // expect(elements.length).toBe(0);
            // });

        });


    });

});