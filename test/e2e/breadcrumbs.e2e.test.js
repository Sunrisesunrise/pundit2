describe("Breadcrumbs interaction", function () {
    var p = protractor.getInstance();

    beforeEach(function () {
        p.get('/app/examples/breadcrumbs.html');
    });

    var appendItems = function (n) {
        // Append N elements on breadcrumb0 and breadcrumb1.
        for (var i = n; i > 0; i--) {
            p.findElement(protractor.By.id('action-button-bc0-append')).click();
            p.findElement(protractor.By.id('action-button-bc1-append')).click();
        }
    };

    it('should correctly append items on different breadcrumbs', function () {
        appendItems(5);

        p.findElements(protractor.By.css('breadcrumbs[bc-name*="first-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(5);
        });

        p.findElements(protractor.By.css('breadcrumbs[bc-name*="second-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(5);
        });
    });

    it('should correctly pop items from different breadcrumbs', function () {
        appendItems(5);

        p.findElement(protractor.By.id('action-button-bc0-pop')).click();
        p.findElement(protractor.By.id('action-button-bc0-pop')).click();
        p.findElements(protractor.By.css('breadcrumbs[bc-name*="first-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(3);
        });

        p.findElement(protractor.By.id('action-button-bc1-pop')).click();
        p.findElement(protractor.By.id('action-button-bc1-pop')).click();
        p.findElements(protractor.By.css('breadcrumbs[bc-name*="second-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(3);
        });
    });

    it('should correctly remove all items from different breadcrumbs', function () {
        appendItems(5);

        p.findElement(protractor.By.id('action-button-bc0-empty')).click();
        p.findElements(protractor.By.css('breadcrumbs[bc-name*="first-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(0);
        });

        p.findElement(protractor.By.id('action-button-bc1-empty')).click();
        p.findElements(protractor.By.css('breadcrumbs[bc-name*="second-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(0);
        });
    });
});