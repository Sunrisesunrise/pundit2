describe("Alert interaction", function() {
    var p = browser;

    beforeEach(function() {
        p.get('/app/examples/alertSystem.html');
    });

    it("should correctly show items", function() {

        var errorAlertButton = element(by.css(".btn-danger")),
            alertAlertButton = element(by.css(".btn-info")),
            customAlertButton = element(by.css(".btn-warning")),
            resetAlertsButton = element(by.css(".btn-default"));



        //TEST ERROR
        //adding error alert: Before inserting there will be 0 error alerts, after there will be 1
        element.all(by.css(".pnd-alert-error")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });

        errorAlertButton.click();
        // wait
        p.sleep(200);

        element.all(by.css(".pnd-alert-error")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });


        //TEST ALERT
        //adding alert: Before inserting there will be 0 alerts, after there will be 1
        element.all(by.css(".pnd-alert-info")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });

        alertAlertButton.click();
        // wait
        p.sleep(200);

        element.all(by.css(".pnd-alert-info")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });

        //CUSTOM
        //adding custom alert: Before inserting there will be 0 custom alerts, after there will be 1
        element.all(by.css(".pnd-alert-warning")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });

        customAlertButton.click();
        // wait
        p.sleep(200);

        element.all(by.css(".pnd-alert-warning")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });



        //REMOVE ALERTS
        //Before removing alerts there should be 3 alerts, after there should be none
        element.all(by.css(".pnd-alert-error")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });
        element.all(by.css(".pnd-alert-info")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });
        element.all(by.css(".pnd-alert-warning")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });

        resetAlertsButton.click();
        // wait
        p.sleep(200);
        element.all(by.css(".pnd-alert-error")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });
        element.all(by.css(".pnd-alert-info")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });
        element.all(by.css(".pnd-alert-warning")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });

    });

    it("should correctly timeout alert", function() {
        //Test timeout
        //First we add a success alert and we verify (using ignoreSynchronization) that the alert is inserted
        //Then we reintroduce ignoreSynchronization=false and we verify that the alert has been removed after the timeout

        var successAlertButton = element(by.css(".btn-success"));
        var useTimeout = element(by.css(".useTimeout"));

        p.ignoreSynchronization = true;
        useTimeout.click();
        element(by.model('timeout')).sendKeys("100");
        successAlertButton.click();
        // wait

        p.sleep(200);

        element.all(by.css(".pnd-alert-success")).then(function(items) {
            expect(items.length).toBe(1);
        }, function(err) {
            expect(err).toBeUndefined();
        });

        p.sleep(1000);

        p.ignoreSynchronization = false;
        element.all(by.css(".pnd-alert-success")).then(function(items) {
            expect(items.length).toBe(0);
        }, function(err) {
            expect(err).toBeUndefined();
        });
    });

});