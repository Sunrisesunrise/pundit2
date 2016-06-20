/*jshint -W051 */ //Only properties should be deleted

angular.module('Pundit2.Client')

.constant('CLIENTLITEDEFAULTS', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client
     *
     * @description
     * `object`
     *
     * Configuration object for Client module. Client service has the task of managing the boot process:
     * loading the basic relationships (from "basicRelations"), downloading from the server user annotations and
     * adding to the DOM modules configured "bootModules".
     */

    /**
     * @ngdoc property
     * @name modules#Client.debug
     *
     * @description
     * `boolean`
     *
     * Active debug log
     *
     * Default value:
     * <pre> debug: false </pre>
     */
    debug: false,

    addDefaultKorbooEESelector: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client.bootModules
     *
     * @description
     * `Array`
     *
     * Boot Modules name list.
     *
     * Default value:
     * <pre> bootModules: [
     *  'AnnotationSidebar'
     * ] </pre>
     */
    bootModules: [
        'LiteTool',
        'AnnotationSidebar'
    ],

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client.bodyClass
     *
     * @description
     * `string`
     *
     * Class added to the body
     *
     * Default value:
     * <pre> bodyClass: 'pnd-annotator' </pre>
     */
    bodyClass: 'pnd-annotator',
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client.hiddenBootstrap
     *
     * @description
     * `bool`
     *
     * hide pundit on bootstrap
     *
     * Default value:
     * <pre> hiddenBootstrap: false </pre>
     */
    hiddenBootstrap: false,
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ClientPro.openSidebarBootstrap
     *
     * @description
     * `bool`
     *
     * open sidebar after pundit bootstrap
     *
     * Default value:
     * <pre> openSidebarBootstrap: false </pre>
     */
    openSidebarBootstrap: false
})

.service('ClientLite', function(CLIENTLITEDEFAULTS, BaseComponent, Config, EventDispatcher, Analytics, MyPundit, LiteTool,
    TextFragmentAnnotator, AnnotationsCommunication, AnnotationsExchange, Item, ItemsExchange, Status, TextFragmentHandler,
    AnnotationSidebar, AnnotationDetails, ResizeManager, NotebookCommunication, NotebookExchange, AnnotationPopover,
    AlertSystem, $injector, $templateCache, $rootScope) {

    var client = new BaseComponent('Client', CLIENTLITEDEFAULTS),
        // Node which will contain every other component
        root;

    var first = false;

    var html = angular.element('html'),
        body = angular.element('body');

    // Verifies that the root node has the wrap class
    var fixRootNode = function() {
        root = angular.element("[data-ng-app='Pundit2']");
        if (!root.hasClass('pnd-wrp')) {
            root.addClass('pnd-wrp');
        }
        root.append('<alert-system></alert-system>');
    };

    // Reads the list of components which needs to be bootstrapped.. and bootstrap
    // them as specified in their .options.
    var addComponents = function() {
        for (var i = 0, l = client.options.bootModules.length; i < l; i++) {
            var name = client.options.bootModules[i];

            // If the module is not active, we do NOT bootstrap it
            if (!Config.isModuleActive(name)) {
                client.log("Not bootstrapping " + name + ": not active.");
                continue;
            }

            // A reference to the module we need to read .options from
            var tmpl,
                mod = $injector.get(name);

            // First case: append to Pundit2's root node
            if ("clientDomTemplate" in mod.options) {
                tmpl = $templateCache.get(mod.options.clientDomTemplate);

                if (typeof(tmpl) === "undefined") {
                    client.err('Can not bootstrap module ' + mod.name + ', template not found: ' + mod.options.clientDomTemplate);
                } else {
                    // DEBUG: Not compiling the templates, or stuff gets initialized twice
                    root.append(tmpl);
                    client.log('Appending to DOM ' + mod.name, tmpl);
                }
                continue;
            }

            // Third case: some option is missing somewhere! Throw an error ..
            client.err("Did not bootstrap module " + name + ": .options parameters missing.");

        } // for l=client.options.bootModules.length

    }; // addComponents()

    // Loads the basic relations into some special ItemsExchange container
    var loadBasicRelations = function() {
        var num = 0,
            relations = client.options.basicRelations;
        for (var p in relations) {
            // property is automatically added to ItemsExchange default container
            ItemsExchange.addItemToContainer(new Item(relations[p].uri, relations[p]), [ItemsExchange.options.defaultRelationsContainer, 'basicRelations']);
        }
        client.log('Loaded ' + num + ' basic relations');
    };

    // Called when the user completed the login process with the modal etc, NOT if the user
    // was already logged in on boot etc
    var onLogin = function() {
        Status.resetProgress();

        NotebookExchange.wipe();
        ItemsExchange.wipe();
        AnnotationsExchange.wipe();
        // TextFragmentHandler.wipeTemporarySelection();

        // There could be private annotations we want to show, get them again
        AnnotationsCommunication.getAnnotations();
        if (Config.useBasicRelations) {
            loadBasicRelations();
        }

        NotebookCommunication.getMyNotebooks();
        NotebookCommunication.getCurrent();
    };

    // Called when the user completed the logout process, clicking on logout
    var onLogout = function() {
        Status.resetProgress();

        NotebookExchange.wipe();
        ItemsExchange.wipe();
        AnnotationsExchange.wipe();
        TextFragmentHandler.wipeTemporarySelection();

        // There might have been private annotations we dont want to show anymore
        AnnotationsCommunication.getAnnotations();
        if (Config.useBasicRelations) {
            loadBasicRelations();
        }
    };

    client.hideClient = function() {
        EventDispatcher.sendEvent('Client.hide');
        angular.element('body').css({
            'marginTop': 0
        });

        html.removeClass(client.options.bodyClass);
        body.removeClass(client.options.bodyClass);

        Status.setState('Pundit', 'canBeShowedAfterHidden', false);

        AlerSystem.clearAlerts();

        root.css('display', 'none');
        $rootScope.$$phase || $rootScope.$digest();
    };

    client.showClient = function() {
        EventDispatcher.sendEvent('Client.show');

        html.addClass(client.options.bodyClass);
        body.addClass(client.options.bodyClass);

        root.css('display', 'inherit');
        $rootScope.$$phase || $rootScope.$digest();
    };

    client.showClientBoot = function() {
        var container = {};
        if (first === false) {
            container = angular.element('.pnd-annotation-sidebar-container');
            html.removeClass(AnnotationSidebar.options.bodyCollapsedClass);
            body.removeClass(AnnotationSidebar.options.bodyCollapsedClass);
            container.removeClass(AnnotationSidebar.options.sidebarCollapsedClass);

            if (AnnotationSidebar.options.isAnnotationSidebarExpanded) {
                html.addClass(AnnotationSidebar.options.bodyExpandedClass);
                body.addClass(AnnotationSidebar.options.bodyExpandedClass);
                container.addClass(AnnotationSidebar.options.sidebarExpandedClass);
            } else {
                html.addClass(AnnotationSidebar.options.bodyCollapsedClass);
                body.addClass(AnnotationSidebar.options.bodyCollapsedClass);
                container.addClass(AnnotationSidebar.options.sidebarCollapsedClass);
            }
            AnnotationSidebar.toggle();
            Status.setState('Pundit', 'canBeShowedAfterHidden', true);
            client.showClient();

            first = true;
        } else {
            if (!Status.getState('Pundit').canBeShowedAfterHidden) {
                AnnotationSidebar.toggle();
                client.showClient();
            }
        }
    };

    // Reads the conf and initializes the active components, bootstrap what needs to be
    // bootstrapped (gets annotations, check if the user is logged in, etc)
    client.boot = function() {
        html.addClass(client.options.bodyClass);
        body.addClass(client.options.bodyClass);

        fixRootNode();
        addComponents();

        if (Config.useBasicRelations) {
            loadBasicRelations();
        }

        AnnotationsCommunication.setUrlPrefix();

        // Check if we're logged in, other components should $watch MyPundit
        // and get notified automatically when logged in, if needed
        MyPundit.checkLoggedIn().then(function(value) {

            if (value === true) {
                NotebookCommunication.getMyNotebooks();
                NotebookCommunication.getCurrent();
            } else if (!Config.modules.Client.hiddenBootstrap) {
                var contributionsMessage = Config.contributions.active ? '<br/><br/>By logging in you agree to the <a target="_blank" href=" ' + Config.contributions.link + ' ">' + Config.contributions.textLink + '</a>.' : '';

                EventDispatcher.sendEvent('Pundit.alert', {
                    title: 'Please log in',
                    id: 'INFO',
                    timeout: Config.contributions.active ? 5000 : 3000,
                    message: 'Log in or register to Pundit to save your annotations and see your private notebooks.' + contributionsMessage,
                    callbacks: [
                        function( /*alert*/ ) {
                            MyPundit.login();
                            return true;
                        }
                    ]
                });
            }

            // Now that we know if we're logged in or not, we can download the right
            // annotations: auth or non-auth form the server
            AnnotationsCommunication.getAnnotations();

            $rootScope.$watch(function() {
                return MyPundit.isUserLogged();
            }, function(newStatus, oldStatus) {
                if (newStatus === oldStatus) {
                    return;
                }
                if (newStatus === true) {
                    client.log('User just logged in');
                    onLogin();
                } else {
                    client.log('User just logged out');
                    onLogout();
                }
            });

        });

        client.log('Boot is completed, emitting pundit-boot-done event');
        EventDispatcher.sendEvent('Client.boot');


        setTimeout(function() {
            Analytics.track('main-events', 'generic', 'client-bootstrap');
        }, 200);

        if (client.options.hiddenBootstrap) {
            client.hideClient();
        }

        Analytics.track('main-events', 'client--endBootstrap');

    };

    client.log("Component up and running");

    return client;
});