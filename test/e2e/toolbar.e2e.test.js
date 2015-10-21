describe("The toolbar module", function() {
    var p = browser;

    // check buttons state where user is not logged in
    var checkNotLoggedUserButtons = function() {

        // user button should be hide
        element.all(By.css('.pnd-toolbar-user-button.ng-hide')).then(function(userButton) {
            expect(userButton.length).toBe(1);
        });

        // login button should be visible
        element.all(By.css('.pnd-login-button')).then(function(loginButton) {
            expect(loginButton.length).toBe(1);

            // click login button
            /*loginButton[0].click().then(function() {
                // dropdown-menu should be visible
                element.all(By.css('.pnd-toolbar-login-button .dropdown-menu li')).then(function(dropdownMenu) {
                    expect(dropdownMenu.length).toBe(2);
                    expect(dropdownMenu[0].getText()).toBe("Please sign in to use Pundit");
                    expect(dropdownMenu[1].getText()).toBe("Sign in");
                });
            });*/
        });

        // status button ok should be visible
        element.all(By.css('.pnd-toolbar-status-button-ok')).then(function(statusOkButton) {
            expect(statusOkButton.length).toBe(1);
        });

        // error button should be hide
        element.all(By.css('.pnd-toolbar-error-button.ng-hide')).then(function(errorButton) {
            expect(errorButton.length).toBe(1);
        });

        // ask the pundit button should be not active
        element.all(By.css('.pnd-toolbar-ask-button')).then(function(askButton) {
            expect(askButton.length).toBe(1);
        });

        // notebook button should be active
        element.all(By.css('.pnd-toolbar-notebook-menu-button .pnd-toolbar-not-active-element')).then(function(notebookButton) {
            expect(notebookButton.length).toBe(1);

            // click notebook button
            notebookButton[0].click().then(function() {
                // dropdown-menu should be visible
                element.all(By.css('.pnd-toolbar-notebook-menu-button .dropdown-menu li')).then(function(dropdownMenu) {
                    expect(dropdownMenu.length).toBe(2);
                    expect(dropdownMenu[0].getText()).toBe("Please log in to select the notebook to store your annotations");
                    expect(dropdownMenu[1].getText()).toBe("Log in");
                });
            });
        });
    };

    // check buttons state where user is logged in
    var checkLoggedUserButtons = function() {

        // user button should be visible and should show user full name
        element.all(By.css('.pnd-toolbar-user-button')).then(function(userButton) {
            expect(userButton.length).toBe(1);
            expect(userButton[0].getText()).toBe("Mario Rossi");

            // click user button
            userButton[0].click().then(function() {
                // dropdown-menu should be visible
                element.all(By.css('.pnd-toolbar-user-button .dropdown-menu li')).then(function(dropdownMenu) {
                    expect(dropdownMenu.length).toBe(2);
                    expect(dropdownMenu[0].getText()).toBe("Edit your profile");
                    expect(dropdownMenu[1].getText()).toBe("Log out");
                });
            });
        });

        // login button should be hide
        element.all(By.css('.pnd-login-button.ng-hide')).then(function(loginButton) {
            expect(loginButton.length).toBe(1);
        });

        // status button ok should be visible
        element.all(By.css('.pnd-toolbar-status-button-ok')).then(function(statusOkButton) {
            expect(statusOkButton.length).toBe(1);
        });

        // error button should be hide
        element.all(By.css('.pnd-toolbar-error-button.ng-hide')).then(function(errorButton) {
            expect(errorButton.length).toBe(1);
        });

        // ask the pundit button should be active
        element.all(By.css('.pnd-toolbar-ask-button-active')).then(function(askButton) {
            expect(askButton.length).toBe(1);
        });

        // dashboard button should be active
        element.all(By.css('.pnd-toolbar-dashboard-toogle-button .pnd-toolbar-active-element')).then(function(dashboardButton) {
            expect(dashboardButton.length).toBe(1);
        });

        // notebook button should be active
        element.all(By.css('.pnd-toolbar-notebook-menu-button .pnd-toolbar-active-element')).then(function(notebookButton) {
            expect(notebookButton.length).toBe(1);
        });
    };

    it('should correctly show loading button', function() {

        p.get('/app/examples/toolbar.html');

        // click set loading btn
        element(By.css('.pnd-test-set-loading')).click();

        element.all(By.css('.pnd-toolbar-loading-button')).then(function(buttons) {
            expect(buttons.length).toBe(1);
        });
        element.all(By.css('.pnd-toolbar-loading-button.ng-hide')).then(function(buttons) {
            expect(buttons.length).toBe(0);
        });

        // click remove loading btn
        element(By.css('.pnd-test-remove-loading')).click();

        element.all(By.css('.pnd-toolbar-loading-button.ng-hide')).then(function(buttons) {
            expect(buttons.length).toBe(1);
        });

    });

    it('should correctly open and close dashboard', function() {

        p.get('/app/examples/toolbar.html');

        // by default dashboard is close
        element.all(By.css('.pnd-dashboard-container.ng-hide')).then(function(d){
            expect(d.length).toBe(1);
        });

        // open dashboard
        element(By.css('.pnd-toolbar-dashboard-toogle-button')).click();
        element.all(By.css('.pnd-dashboard-container.ng-hide')).then(function(d){
            expect(d.length).toBe(0);
        });

        // close dashboard
        element(By.css('.pnd-toolbar-dashboard-toogle-button')).click();
        element.all(By.css('.pnd-dashboard-container.ng-hide')).then(function(d){
            expect(d.length).toBe(1);
        });

    });

    it('should correctly open and close sidebar', function() {

        p.get('/app/examples/toolbar.html');

        // by default siderbar is collapsed
        element.all(By.css('annotation-sidebar > .pnd-annotation-sidebar-collapsed')).then(function(d){
            expect(d.length).toBe(1);
        });

        // open sidebar
        element(By.css('.pnd-toolbar-annotations-button')).click();
        element.all(By.css('annotation-sidebar > .pnd-annotation-sidebar-expanded')).then(function(d){
            expect(d.length).toBe(1);
        });

        // close sidebar
        element(By.css('.pnd-toolbar-annotations-button')).click();
        element.all(By.css('annotation-sidebar > .pnd-annotation-sidebar-collapsed')).then(function(d){
            expect(d.length).toBe(1);
        });

    });

    it('should correctly open info dropdown', function() {
        p.get('/app/examples/toolbar.html');

        // click set loading btn
        element(By.css('.pnd-test-set-loading')).click();

        element.all(By.css('.pnd-toolbar-loading-button')).then(function(buttons) {
            expect(buttons.length).toBe(1);
        });

        // open info dropdown
        element(By.css('.pnd-toolbar-loading-button')).click();
        // check if dropdown exist
        element.all(By.css('.pnd-toolbar-loading-button .dropdown-menu')).then(function(d){
            expect(d.length).toBe(1);
        });
        // check if dropdown exist
        element.all(By.css('.pnd-toolbar-loading-button .dropdown-menu a')).then(function(a){
            expect(a.length).toBe(2);
            expect(a[0].getText()).toEqual("About Pundit");
        });

        // click remove loading btn
        element(By.css('.pnd-test-remove-loading')).click();

        // open info dropdown
        element(By.css('.pnd-toolbar-status-button-ok')).click();
        // check if dropdown exist
        element.all(By.css('.pnd-toolbar-status-button-ok .dropdown-menu')).then(function(d){
            expect(d.length).toBe(1);
        });
        // check if dropdown exist
        element.all(By.css('.pnd-toolbar-status-button-ok .dropdown-menu a')).then(function(a){
            expect(a.length).toBe(2);
            expect(a[0].getText()).toEqual("About Pundit");
        });
    });

    var httpMock = function() {
        angular.module('httpBackendMock', ['ngMockE2E'])
            .run(function($httpBackend, NameSpace) {

                var userLoggedIn = {
                    loginStatus: 1,
                    id: "myFakeId",
                    uri: "http://myUri.fake",
                    openid: "http://myOpenId.fake",
                    firstName: "Mario",
                    lastName: "Rossi",
                    fullName: "Mario Rossi",
                    email: "mario@rossi.it",
                    loginServer: "http:\/\/demo-cloud.as.thepund.it:8080\/annotationserver\/login.jsp"
                };

                var logoutOk = { logout: 1 };

                $httpBackend.whenGET(NameSpace.get('asUsersLogout')).respond(logoutOk);
                $httpBackend.whenGET(NameSpace.get('asUsersCurrent')).respond(userLoggedIn);

                var myNotebooks = {
                    NotebookIDs: ["18cd546a", "123zzz"]
                };
                $httpBackend.whenGET(NameSpace.get('asNBOwned')).respond(myNotebooks);

                var notebookMetadata1 = {
                    "http://purl.org/pundit/demo-cloud-server/notebook/18cd546a": {
                        "http://purl.org/pundit/ont/ao#id": [{value:"18cd546a", type:"literal"}],
                        "http://open.vocab.org/terms/visibility": [{value:"public", type:"literal"}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{value:"Notebook Name", type:"literal"}],
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [{value:"http://purl.org/pundit/ont/ao#Notebook", type:"uri"}]
                    }
                };
                $httpBackend.whenGET(NameSpace.get('asNBMeta', {id:"18cd546a"})).respond(notebookMetadata1);

                var notebookMetadata2 = {
                    "http://purl.org/pundit/demo-cloud-server/notebook/123zzz": {
                        "http://purl.org/pundit/ont/ao#id": [{value:"123zzz", type:"literal"}],
                        "http://open.vocab.org/terms/visibility": [{value:"private", type:"literal"}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{value:"Second Notebook Name", type:"literal"}],
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [{value:"http://purl.org/pundit/ont/ao#Notebook", type:"uri"}]
                    }
                };
                $httpBackend.whenGET(NameSpace.get('asNBMeta', {id:"123zzz"})).respond(notebookMetadata2);

                var currentNotebook = {NotebookID: "18cd546a"};
                $httpBackend.whenGET(NameSpace.get('asNBCurrent')).respond(currentNotebook);

                var templates = {
                    label: 'Template Name',
                    triples : []
                };
                $httpBackend.whenJSONP(new RegExp("http://template-test-url.com/t1")).respond(templates);

            });
    };

    beforeEach(function() {
        p.addMockModule('httpBackendMock', httpMock);
        p.driver.manage().window().setSize(1200, 960);
    });

    afterEach(function() {
        p.removeMockModule('httpBackendMock');
    });

    it('should show button in according with user status', function() {

        p.get('/app/examples/toolbar.html');

        // at the begin user is not logged in yet
        checkNotLoggedUserButtons();

        // click login button and get login
        element(By.css('.btn-example-login')).click().then(function() {
            // at this time user should be logged in
            checkLoggedUserButtons();
        });

        // click logout button
        element(By.css('.btn-example-logout')).click().then(function() {
            // at this time user should not be logged in anymore
            checkNotLoggedUserButtons();
        });

    });

    it('should correctly show my notebooks', function() {

        p.get('/app/examples/toolbar.html');

        // click login button and get login
        element(By.css('.btn-example-login')).click();
        // click get my notebooks button
        element(By.css('.pnd-test-get-my-notebooks')).click();
        // click and open my notebooks dropdown
        element(By.css('toolbar .pnd-toolbar-notebook-menu-button')).click();
        // check dropdown voices number
        element.all(By.css('toolbar .pnd-toolbar-notebook-menu-button .dropdown-menu li')).then(function(items) {
            expect(items.length).toBe(3);
            expect(items[1].getText()).toBe("Second Notebook Name");
            expect(items[2].getText()).toBe("Notebook Name");
        });
        // check dropdown voices icon (public icon)
        element.all(By.css('toolbar .pnd-toolbar-notebook-menu-button .dropdown-menu .pnd-icon-group')).then(function(icons) {
            expect(icons.length).toBe(1);
        });
        // check dropdown voices icon (private icon)
        element.all(By.css('toolbar .pnd-toolbar-notebook-menu-button .dropdown-menu .pnd-icon-lock')).then(function(icons) {
            expect(icons.length).toBe(1);
        });

    });

    it('should correctly show current notebook name', function() {

        p.get('/app/examples/toolbar.html');

        // click login button and get login
        element(By.css('.btn-example-login')).click();

        // get current info
        element(By.css('.pnd-test-get-current-notebook')).click();

        // check showed name
        element.all(By.css('toolbar .pnd-toolbar-notebook-menu-button span')).then(function(spans) {
            expect(spans[1].getText()).toBe("Notebook Name");
        });
    });

    it('should correctly show current template name', function() {

        p.get('/app/examples/toolbar.html');

        // check showed name
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button span')).then(function(spans) {
            expect(spans[0].getText()).toBe("Loading...");
        });

        // get templates
        element(By.css('.pnd-test-get-templates')).click();

        // check showed name
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button span')).then(function(spans) {
            expect(spans[0].getText()).toBe("Template Name");
        });
    });

    it('should correctly show templates dropdown list', function() {

        p.get('/app/examples/toolbar.html');

        // get templates
        element(By.css('.pnd-test-get-templates')).click();
        // open templates dropdown
        element(By.css('toolbar .pnd-toolbar-template-menu-button')).click();

        // check dropdown voices number
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button .dropdown-menu li')).then(function(items) {
            expect(items.length).toBe(2);
            expect(items[1].getText()).toBe("Template Name");
        });
        // check dropdown voices icon (color icon)
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button .dropdown-menu .pnd-icon-circle')).then(function(icons) {
            expect(icons.length).toBe(1);
        });
        // check dropdown voices icon (current icon)
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button .dropdown-menu .pnd-icon-check')).then(function(icons) {
            expect(icons.length).toBe(1);
        });
    });

    it('should correctly activate template mode', function(){

        p.get('/app/examples/toolbar.html');

        // template icon is disable
        element.all(By.css('toolbar .pnd-toolbar-template-mode-button .pnd-toolbar-not-active-element')).then(function(s) {
            expect(s.length).toBe(1);
        });
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button .pnd-toolbar-not-active-element')).then(function(s) {
            expect(s.length).toBe(2);
        });
        //enable template mode
        element(By.css('toolbar .pnd-toolbar-template-mode-button')).click();
        // template icon is enabled
        element.all(By.css('toolbar .pnd-toolbar-template-mode-button .pnd-toolbar-not-active-element')).then(function(s) {
            expect(s.length).toBe(0);
        });
        element.all(By.css('toolbar .pnd-toolbar-template-menu-button .pnd-toolbar-not-active-element')).then(function(s) {
            expect(s.length).toBe(0);
        });
    });

    it('should correctly activate/deactivate filtered mode', function(){

        p.get('/app/examples/toolbar.html');

        // by default siderbar is collapsed
        element.all(By.css('annotation-sidebar > .pnd-annotation-sidebar-collapsed')).then(function(d){
            expect(d.length).toBe(1);
        });

        // open sidebar
        element(By.css('.pnd-toolbar-annotations-button')).click();
        element.all(By.css('annotation-sidebar > .pnd-annotation-sidebar-expanded')).then(function(d){
            expect(d.length).toBe(1);
        });

        element(By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        element(By.css('.pnd-annotation-sidebar-filter-broken')).click();

        element.all(By.css('.pnd-toolbar-annotations-button .pnd-filter-active')).then(function(d){
            expect(d.length).toBe(1);
        });

        element(By.css('.pnd-annotation-sidebar-filter-broken')).click();

        element.all(By.css('.pnd-toolbar-annotations-button .pnd-filter-active')).then(function(d){
            expect(d.length).toBe(0);
        });

    });

});