describe("ResourcePanel interaction", function() {
    var p = browser;

    beforeEach(function(){
        p.get('/app/examples/resourcePanel.html');
    });

    it("should show resource panel when click on subject field and hide it when click on cancel button", function(){
        // Click on subject field.
        element(By.css('input[ng-model="subject"]')).click();
        // Check if resource panel shows up.
        element.all(By.css(".pnd-resource-panel-popover")).then(function(popover) {
            expect(popover.length).toBe(1);
        });

        // Hide resource panel by clicking on Cancel button.
        element(By.css('.pnd-resource-panel-popover button[ng-click="cancel()"]')).click();
        // Check if resource panel shows up.
        element.all(By.css(".pnd-resource-panel-popover")).then(function(popover) {
            expect(popover.length).toBe(0);
        });
    });

    it("should correctly filter items by typing some text", function(){
        // Click on subject field.
        element(By.css('input[ng-model="subject"]')).click();
        // Check if resource panel shows up.
        element.all(By.css(".pnd-resource-panel-popover")).then(function(popover) {
            expect(popover.length).toBe(1);
        });

        // Clear search field and type some text.
        element(By.css('.pnd-resource-panel-popover input.pnd-rsp-input')).clear();
        element(By.css('.pnd-resource-panel-popover input.pnd-rsp-input')).sendKeys("greates");

        element.all(By.css('.pnd-resource-panel-popover .pnd-vertical-tab-list-content ul li.list-group-item')).then(function(items) {
            expect(items.length).toBe(1);
        });
    });

    it("should correctly select one item", function(){
        // Click on subject field.
        element(By.css('input[ng-model="subject"]')).click();
        // Check if resource panel shows up.
        element.all(By.css(".pnd-resource-panel-popover")).then(function(popover) {
            expect(popover.length).toBe(1);
        });

        element.all(By.css('.pnd-resource-panel-popover .pnd-vertical-tab-list-content ul li.list-group-item')).then(function(items) {
            items[0].click();
            items[0].findElements(protractor.By.css('.pnd-select-item')).then(function(selected) {
              expect(selected.length).toBe(1);
            });
        });

        element.all(By.css('.pnd-resource-panel-popover .pnd-vertical-tab-footer-content button.disabled')).then(function(disabled) {
          expect(disabled.length).toBe(0);
        });

        element(By.css('.pnd-resource-panel-popover .pnd-vertical-tab-footer-content button.pnd-use')).click();

        element(By.css('span[id="test5"]')).then(function(span) {
          expect(span.getText()).toBeDefined();
        });

    });

});