describe("Breadcrumbs interaction", function () {
    var p = browser;

    beforeEach(function () {
        p.get('/app/examples/breadcrumbs.html');
    });

    var appendItems = function (n) {
        // Append N elements on breadcrumb0 and breadcrumb1.
        for (var i = n; i > 0; i--) {
           element(by.id('action-button-bc0-append')).click();
           element(by.id('action-button-bc1-append')).click();
        }
    };

    it('should correctly append items on different breadcrumbs', function () {
        appendItems(5);

       element.all(by.css('breadcrumbs[bc-name*="first-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(5);
        });

       element.all(by.css('breadcrumbs[bc-name*="second-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(5);
        });
    });

    it('should correctly pop items from different breadcrumbs', function () {
        appendItems(5);

       element(by.id('action-button-bc0-pop')).click();
       element(by.id('action-button-bc0-pop')).click();
       element.all(by.css('breadcrumbs[bc-name*="first-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(3);
        });

       element(by.id('action-button-bc1-pop')).click();
       element(by.id('action-button-bc1-pop')).click();
       element.all(by.css('breadcrumbs[bc-name*="second-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(3);
        });
    });

    it('should correctly remove all items from different breadcrumbs', function () {
        appendItems(5);

       element(by.id('action-button-bc0-empty')).click();
       element.all(by.css('breadcrumbs[bc-name*="first-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(0);
        });

       element(by.id('action-button-bc1-empty')).click();
       element.all(by.css('breadcrumbs[bc-name*="second-breadcrumb"] li')).then(function (elements) {
            expect(elements.length).toBe(0);
        });
    });
});