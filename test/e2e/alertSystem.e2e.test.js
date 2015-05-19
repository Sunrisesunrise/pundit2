ddescribe("Alert interaction", function() {
    var p = protractor.getInstance();

    beforeEach(function(){
        p.get('/app/examples/alertSystem.html');
    });

    it("should correctly show items", function(){

        var errorAlertButton = p.findElement(protractor.By.css(".btn-danger")),
            alertAlertButton = p.findElement(protractor.By.css(".btn-info")),
            customAlertButton = p.findElement(protractor.By.css(".btn-warning")),
            resetAlertsButton = p.findElement(protractor.By.css(".btn-default"));


        //TEST ERROR
        //adding error alert: Before inserting there will be 0 error alerts, after there will be 1
        p.findElements(protractor.By.css(".alert-danger")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );

        p.actions().mouseMove(errorAlertButton).click().perform();
        // wait
        p.sleep(200);

        p.findElements(protractor.By.css(".alert-danger")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );


        //TEST ALERT
        //adding alert: Before inserting there will be 0 alerts, after there will be 1
        p.findElements(protractor.By.css(".alert-info")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );

        p.actions().mouseMove(alertAlertButton).click().perform();
        // wait
        p.sleep(200);

        p.findElements(protractor.By.css(".alert-info")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );

        //CUSTOM
        //adding custom alert: Before inserting there will be 0 custom alerts, after there will be 1
        p.findElements(protractor.By.css(".alert-warning")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );

        p.actions().mouseMove(customAlertButton).click().perform();
        // wait
        p.sleep(200);

        p.findElements(protractor.By.css(".alert-warning")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );



        //REMOVE ALERTS
        //Before removing alerts there should be 3 alerts, after there should be none
        p.findElements(protractor.By.css(".alert-danger")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );
        p.findElements(protractor.By.css(".alert-info")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );
        p.findElements(protractor.By.css(".alert-warning")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );

        p.actions().mouseMove(resetAlertsButton).click().perform();
        // wait
        p.sleep(200);
        p.findElements(protractor.By.css(".alert-danger")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );
        p.findElements(protractor.By.css(".alert-info")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );
        p.findElements(protractor.By.css(".alert-warning")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );

    });

    it("should correctly timout alert", function(){
        //Test timeout
        //First we add a success alert and we verify (using ignoreSynchronization) that the alert is inserted
        //Then we reintroduce ignoreSynchronization=false and we verify that the alert has been removed after the timeout

        var successAlertButton = p.findElement(protractor.By.css(".btn-success"));

        p.ignoreSynchronization = true;
        p.actions().mouseMove(successAlertButton).click().perform();
        // wait
        p.sleep(200);

        p.findElements(protractor.By.css(".alert-success")).then(function(items){
                expect(items.length).toBe(1);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );


        p.ignoreSynchronization = false;
        p.findElements(protractor.By.css(".alert-success")).then(function(items){
                expect(items.length).toBe(0);
            }, function(err){
                expect(err).toBeUndefined();
            }
        );
    });

});