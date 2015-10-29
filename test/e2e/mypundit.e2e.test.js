describe("OpenID Login", function() {

    // var p = browser;

    // it('should show popup login modal', function() {

    //     // google account credentials
    //     var myPassword = "netseven";
    //     var myEmail = "netsevenopenid@gmail.com";
    //     var username = "Mario Bros";

    //     p.get('/app/examples/mypundit.testPage.html');

    //     // open login modal
    //     element(by.css('.btn-example-login')).click();

    //     // open login popup
    //     element(by.css('.pnd-login-modal-openPopUp')).click();

    //     // needed to prevent 'Error while waiting for Protractor to sync with the page: {}'
    //     p.ignoreSynchronization = true;
    //     var mainWindow, popUpLogin;

    //     // get all windows open
    //     p.getAllWindowHandles().then(function(windows) {

    //         // at this time windows should be 2
    //         expect(windows.length).toBe(2);

    //         mainWindow = windows[0];
    //         popUpLogin = windows[1];

    //         // get handle to popup login modal
    //         var handle = browser.switchTo().window(popUpLogin);
    //         handle = browser.getWindowHandle();
    //         expect(handle).toEqual(popUpLogin);
    //         browser.driver.executeScript('window.focus();');

    //         // get google button and click it
    //         element(by.css('.google.openid_large_btn')).then(function(openIdButton) {

    //             openIdButton.click();

    //             // fill form with my google account credentials
    //             element(by.id('Email')).sendKeys(myEmail);
    //             element(by.id('Passwd')).sendKeys(myPassword);

    //             // submit form
    //             element(by.id('signIn')).click().then(function() {

    //                 // get handle to main window
    //                 handle = browser.switchTo().window(mainWindow);
    //                 handle = browser.getWindowHandle();
    //                 expect(handle).toEqual(mainWindow);
    //                 browser.driver.executeScript('window.focus();');

    //                 // at this time user should be logged in
    //                 // user button should be visible and should show user full name
    //                 element.all(by.css('.pnd-toolbar-user-button')).then(function(userButton) {
    //                     //TODO: TROVARE UNA SOLUZIONE PER QUESTO SLEEP. SENZA NON VIENE AGGIORNATA LA PAGINA
    //                     p.sleep(1000);
    //                     expect(userButton.length).toBe(1);
    //                     expect(userButton[0].getText()).toBe(username);

    //                 }); // end find .pnd-toolbar-user-button

    //                 // get logout
    //                 p.sleep(1000);
    //                 element(by.css('.btn-example-logout')).then(function(logoutButton) {
    //                     logoutButton.click().then(function() {
    //                         p.sleep(1000);
    //                         element.all(by.css('.pnd-toolbar-user-button.ng-hide')).then(function(userButton) {
    //                             expect(userButton.length).toBe(1);
    //                             p.waitForAngular();
    //                             p.sleep(1000);
    //                             p.ignoreSynchronization = false;
    //                         });
    //                     });
    //                 });

    //             }); //  end fine signIn

    //         }); // end find .google.openid_large_btn
    //     }); // end getAllWindowHandles

    // }); // end test

});