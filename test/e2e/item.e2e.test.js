describe("Item interaction", function() {
    var p = browser;

    beforeEach(function(){
        p.get('/app/examples/item.html');
    });

    it("should correctly show item", function(){

        element(By.css("[data-ng-app='Pundit2'] item")).then(function(item) {
            // directive attribute
            expect(item.getAttribute('uri')).toEqual("testItemUri");
            expect(item.getAttribute('menu-type')).toEqual("testMenuType");
        });

        element.all(By.css(".pnd-item-buttons button")).then(function(buttons) {
            expect(buttons.length).toBe(1);
        });

        element.all(By.css(".pnd-item-text span")).then(function(texts) {
            expect(texts.length).toBe(2);
        });

        element(By.css(".pnd-type")).then(function(label) {
            expect(label.getText()).toEqual("TEXT FRAGMENT");
        });

        element(By.css(".pnd-item-label")).then(function(label) {
            expect(label.getText()).toEqual("Item Label");
        });

    });

    it("should correctly set item to sticky", function(){

        var item = element(By.css("item")),
            head = element(By.css("item .pnd-item"));

        p.actions().mouseMove(item).perform();

        // wait animation
        p.sleep(500);

        element.all(By.css(".pnd-sticky-item")).then(function(items){
            expect(items.length).toBe(0);
        });

        p.actions().mouseMove(head).click().perform();

        element.all(By.css(".pnd-sticky-item")).then(function(items){
            expect(items.length).toBe(1);
        });

    });

    it("should correctly open item menu", function(){

        var item = element(By.css("item")),
            menuBtn = element(By.css("item .pnd-icon-dots"));

        p.actions().mouseMove(item).perform();

        // wait animation
        p.sleep(500);

        element.all(By.css(".dropdown-menu")).then(function(items){
            expect(items.length).toBe(0);
        });

        p.actions().mouseMove(menuBtn).click().perform();

        element.all(By.css(".dropdown-menu")).then(function(items){
            expect(items.length).toBe(1);
        });

    });

});