describe("Test some Korbo UI features", function() {
    var p = browser;

    beforeEach(function() {
        p.get('/app/examples/client.html');
    });

    it("should block entity creation due to type incompatibility", function() {

        // Open dashboard.
        element(by.css('.pnd-toolbar-navbar .pnd-toolbar-dashboard-toogle-button a')).then(function(elem){
            elem.click();
            element.all(by.css('.pnd-triplecomposer-statements-container statement .pnd-statement-row .pnd-row-button-predicate')).then(function(elements){
                // Check if predicate button is present.
                expect(elements.length).toBe(1);
                // Click on predicate button.
                elements[0].click();
                // Check if it correctly opens resource panel.
                element.all(by.css('.pnd-resource-panel-popover')).then(function(elements){
                    expect(elements.length).toBe(1);
                });

                // Check if there are more then 3 predicates and click on 3rd one.
                element.all(by.css('.pnd-resource-panel-popover .pnd-item')).then(function(elements){
                    expect(elements.length).toBeGreaterThan(3);
                    // Click on "is similar to" predicate
                    elements[2].click();

                    // Use it.
                    element(by.css('.pnd-resource-panel-use-button')).click();
                });

                element(by.css('.pnd-triplecomposer-statements-container statement .pnd-statement-row .pnd-row-button-subject')).click();
                // Check if it correctly opens resource panel.
                element.all(by.css('.pnd-resource-panel-popover')).then(function(elements){
                    expect(elements.length).toBe(1);
                });
                // Check if it new button is present.
                element.all(by.css('.pnd-resource-panel-popover .pnd-resource-panel-new-button:not(.ng-hide)')).then(function(elements){
                    expect(elements.length).toBe(1);
                    elements[0].click();
                    //browser.pause();
                });
                // Check if it correctly opens Korbo modal.
                element.all(by.css('.kee-modal-container')).then(function(elements){
                    expect(elements.length).toBe(1);
                });

                // Insert mandatory title text.
                element(by.css('.kee-modal-container .kee-title input')).then(function(element){
                    element.sendKeys("Entity example title");
                });

                // Insert mandatory description text.
                element(by.css('.kee-modal-container .kee-description textarea')).then(function(element){
                    element.sendKeys("Entity example description");
                });

                element(by.css('.kee-modal-container .kee-footer button[ng-click="save()"]')).then(function(elem){
                    elem.click();
                });

                // Check if entity saving is correctly blocked and if UI shows that.
                // 1. check active tab, it shold be "Advanced fields".
                element.all(by.css('.kee-modal-container .kee-top-area ul.nav-tabs li')).then(function(elements){
                    expect(elements[1].getAttribute('class')).toMatch('active');
                });
                // 2. check for error message.
                element(by.css('.kee-modal-container .kee-top-area-message')).then(function(element){
                    element.getText().then(function(text){
                        text = text.trim();
                        var hasCorrectText = text.indexOf('Incompatible entity types') !== -1;
                        expect(hasCorrectText).toBe(true);
                    });
                });

            });
        });


    });
});