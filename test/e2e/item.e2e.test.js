describe("Item interaction", function() {
    var p = protractor.getInstance();

    beforeEach(function(){
        p.get('/app/examples/item.html');
    });

    it("should correctly show item", function(){

        p.findElement(protractor.by.css("[data-ng-app='Pundit2'] item")).then(function(item) {
            // directive attribute
            expect(item.getAttribute('uri')).toEqual("testItemUri");
            expect(item.getAttribute('menu-type')).toEqual("testMenuType");
        });

        p.findElements(protractor.by.css(".pnd-item-buttons button")).then(function(buttons) {
            expect(buttons.length).toBe(1);
        });

        p.findElements(protractor.by.css(".pnd-item-text span")).then(function(texts) {
            expect(texts.length).toBe(2);
        });

        p.findElement(protractor.by.css(".pnd-type")).then(function(label) {
            expect(label.getText()).toEqual("TEXT FRAGMENT");
        });

        p.findElement(protractor.by.css(".pnd-item-label")).then(function(label) {
            expect(label.getText()).toEqual("Item Label");
        });

    });

    it("should correctly set item to sticky", function(){

        var item = p.findElement(protractor.by.css("item")),
            head = p.findElement(protractor.by.css("item .pnd-item"));

        p.actions().mouseMove(item).perform();

        // wait animation
        p.sleep(500);

        p.findElements(protractor.by.css(".pnd-sticky-item")).then(function(items){
            expect(items.length).toBe(0);
        });

        p.actions().mouseMove(head).click().perform();

        p.findElements(protractor.by.css(".pnd-sticky-item")).then(function(items){
            expect(items.length).toBe(1);
        });

    });

    it("should correctly open item menu", function(){

        var item = p.findElement(protractor.by.css("item")),
            menuBtn = p.findElement(protractor.by.css("item .pnd-icon-dots"));

        p.actions().mouseMove(item).perform();

        // wait animation
        p.sleep(500);

        p.findElements(protractor.by.css(".dropdown-menu")).then(function(items){
            expect(items.length).toBe(0);
        });

        p.actions().mouseMove(menuBtn).click().perform();

        p.findElements(protractor.by.css(".dropdown-menu")).then(function(items){
            expect(items.length).toBe(1);
        });

    });

});