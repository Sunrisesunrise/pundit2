angular.module('Pundit2.Annotators')

    .constant('CHOHANDLERDEFAULTS', {
        /**
         * @module punditConfig
         * @ngdoc property
         * @name modules#CHOHandler.ignoreClasses
         *
         * @description
         * `array of string`
         *
         * List of classes added to content to ignore it and not annotate it.
         * Any content classed with any of these class will get ignored by the handler.
         * If selection to annotate start, ends or contains one of those classes, nothing will happen
         *
         * Default value:
         * <pre> ignoreClasses: ['pnd-ignore'] </pre>
         */

        ignoreClasses: ['pnd-ignore'],


        // Contextual menu type triggered by the text fragment handler. An Item will
        // be passed as resource

        /**
         * @module punditConfig
         * @ngdoc property
         * @name modules#CHOHandler.cMenuType
         *
         * @description
         * `string`
         *
         * Contextual menu type shown over image
         *
         * Default value:
         * <pre> cMenuType: 'CHOHandlerItem' </pre>
         */
        cMenuType: "CHOHandlerItem",

        /**
         * @module punditConfig
         * @ngdoc property
         * @name modules#CHOHandler.labelMaxLength
         *
         * @description
         * `number`
         *
         * Maximum characters number of image src used to create the label for annotation.
         *
         * Default value:
         * <pre> labelMaxLength: 40 </pre>
         */
        labelMaxLength: 40

    })

    .service('CHOHandler', function(CHOHANDLERDEFAULTS, NameSpace, BaseComponent, Config,
                                      TextFragmentHandler, XpointersHelper, Item, $compile, $timeout, $rootScope, ContextualMenu, AnnotationPopover, TripleComposer, ItemsExchange, $q, EventDispatcher, AnnotationsExchange) {

        var initContextualMenu = function() {
            ContextualMenu.addAction({
                name: 'resComment',
                type: ["CHOHandlerItem"],
                label: 'Comment',
                showIf: function() {
                    return true;
                },
                priority: 99,
                action: function(item) {
                    var coordinates = ContextualMenu.getLastXY(),
                        fragmentId = ContextualMenu.getLastRef();
                    AnnotationPopover.show(coordinates.x, coordinates.y, item, '', fragmentId, 'comment');
                }
            });
            ContextualMenu.addDivider({
                priority: 98,
                type: ["CHOHandlerItem"]
            });
            ContextualMenu.addAction({
                name: 'resUseAsSubject',
                type: ["CHOHandlerItem"],
                label: 'Use as subject',
                showIf: function() {
                    return true;
                },
                priority: 97,
                action: function(item) {
                    TripleComposer.addToSubject(item);
                }
            });
            ContextualMenu.addAction({
                name: 'resUseAsObject',
                type: ["CHOHandlerItem"],
                label: 'Use as Object',
                showIf: function() {
                    return true;
                },
                priority: 96,
                action: function(item) {
                    TripleComposer.addToObject(item);
                }
            });
            ContextualMenu.addAction({
                name: 'resAddToFavourites',
                type: ["CHOHandlerItem"],
                label: 'Add to Favourites',
                showIf: function() {
                    return true;
                },
                priority: 95
            });

            ContextualMenu.addDivider({
                priority: 94,
                type: ["CHOHandlerItem"]
            });
            ContextualMenu.addAction({
                name: 'resTemplate1',
                type: ["CHOHandlerItem"],
                label: 'Template1',
                showIf: function() {
                    return true;
                },
                priority: 93
            });
            ContextualMenu.addAction({
                name: 'resTemplate2',
                type: ["CHOHandlerItem"],
                label: 'Template2',
                showIf: function() {
                    return true;
                },
                priority: 92
            });
        };

        var CHO = new BaseComponent('CHOHandler', CHOHANDLERDEFAULTS);

        //find pnd-resource
        var CHOElem = angular.element(".pnd-resource");
        //add directive attribute
        CHOElem.addClass("cho-menu");
        var promise = $q.defer();
        //compile the DOM
        $compile(angular.element(".pnd-resource"))($rootScope);
        promise.resolve();
        initContextualMenu();
        //hasAnnotation();

        EventDispatcher.addListeners(
            [
                'Consolidation.consolidateAll',
            ],
            function() {
                var resourceInDom = angular.element("span.pnd-resource");
                for(var i=0;i <resourceInDom.length;i++){
                    var item = ItemsExchange.getItemByUri(resourceInDom[i].getAttribute("about"));
                    if(typeof item !== "undefined"){
                        var span =  angular.element('span.pnd-resource[about="'+item.uri+'"]');
                        span[0].style.backgroundColor = "yellow";
                    }
                }
            });


        return CHO;

    });