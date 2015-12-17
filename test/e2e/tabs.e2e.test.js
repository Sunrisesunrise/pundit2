describe("Tabs interaction", function() {
    var p = browser;

    it('should load template and compile directive for each panel in the dashboard', function() {
        var panelNum = 3;

        p.driver.manage().window().setSize(1200, 960);
        p.get('/app/examples/tabs.html');

        element.all(by.css('.pnd-tab-header')).then(function(elements) {
            expect(elements.length).toBe(panelNum);
        });

        element.all(by.css('.pnd-tab-content')).then(function(elements) {
            expect(elements.length).toBe(panelNum);
        });


    });

});