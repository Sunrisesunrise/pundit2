angular.module('Pundit2.Annotators')

.constant('RESOURCEHANDLERDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ResourceHandler.ignoreClasses
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
     * @name modules#ResourceHandler.cMenuType
     *
     * @description
     * `string`
     *
     * Contextual menu type shown over image
     *
     * Default value:
     * <pre> cMenuType: 'resourceHandlerItem' </pre>
     */
    cMenuType: 'resourceHandlerItem',

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ResourceHandler.labelMaxLength
     *
     * @description
     * `number`
     *
     * Maximum characters number of image src used to create the label for annotation.
     *
     * Default value:
     * <pre> labelMaxLength: 40 </pre>
     */
    labelMaxLength: 40,

    /**
     * @module punditConfig
     * @ngdoc object
     * @name modules#ResourceHandler.useAsSubject
     *
     * @description
     * `boolean`
     *
     * Active 'Use as subject' in contextualMenu
     *
     * Default value:
     * <pre> 
     *    useAsSubject: true
     * </pre>
     */
    useAsSubject: true,

    /**
     * @module punditConfig
     * @ngdoc object
     * @name modules#ResourceHandler.useAsObject
     *
     * @description
     * `boolean`
     *
     * Active 'Use as object' in contextualMenu
     *
     * Default value:
     * <pre> 
     *    useAsObject: true
     * </pre>
     */
    useAsObject: true
})

.service('ResourceHandler', function(RESOURCEHANDLERDEFAULTS, NameSpace, BaseComponent, Config,
    TextFragmentHandler, XpointersHelper, Item, $compile, $timeout, $rootScope, ContextualMenu, AnnotationPopover, TripleComposer, ItemsExchange, $q, EventDispatcher, ResourcePanel) {

    var resourceHandler = new BaseComponent('ResourceHandler', RESOURCEHANDLERDEFAULTS);

    var resourceElem = angular.element('.pnd-resource'), //find pnd-resource
        promise = $q.defer();

    var initContextualMenu = function() {
        var templateConfig = Config.template;

        ContextualMenu.addAction({
            name: 'resComment',
            type: [resourceHandler.options.cMenuType],
            label: 'Comment',
            showIf: function() {
                return true;
            },
            priority: 99,
            action: function(item) {
                var coordinates = ContextualMenu.getLastXY(),
                    fragmentId = ContextualMenu.getLastRef(),
                    resourceElem = angular.element("[about='" + item.uri + "']");
                resourceElem.addClass('pnd-range-pos-icon');
                AnnotationPopover.show(coordinates.x, coordinates.y, item, '', fragmentId, 'comment', resourceElem);
            }
        });

        ContextualMenu.addDivider({
            priority: 98,
            type: [resourceHandler.options.cMenuType]
        });

        // TODO: move this in TripleComposer
        if (resourceHandler.options.useAsSubject) {
            ContextualMenu.addAction({
                name: 'resUseAsSubject',
                type: [resourceHandler.options.cMenuType],
                label: 'Use as subject',
                showIf: function() {
                    return true;
                },
                priority: 97,
                action: function(item) {

                    TripleComposer.addToSubject(item);
                }
            });
        }

        if (resourceHandler.options.useAsObject) {
            ContextualMenu.addAction({
                name: 'resUseAsObject',
                type: [resourceHandler.options.cMenuType],
                label: 'Use as Object',
                showIf: function() {
                    return true;
                },
                priority: 96,
                action: function(item) {
                    TripleComposer.addToObject(item);
                }
            });

        }
        if (resourceHandler.options.useAsObject || resourceHandler.options.useAsObject) {
            ContextualMenu.addDivider({
                priority: 95,
                type: [resourceHandler.options.cMenuType]
            });
        }
        if (templateConfig.active) {
            var prior = 90;

            for (var i = 0; i < templateConfig.list.length; i++) {
                if (templateConfig.list[i].types.indexOf('resource')) {
                    ContextualMenu.addAction({
                        name: templateConfig.list[i].label.replace(/\s/g, ''),
                        type: [resourceHandler.options.cMenuType],
                        label: templateConfig.list[i].label,

                        showIf: function() {
                            return true;
                        },
                        priority: prior--,
                        action: (function(idx) {
                            return function(item) {
                                var triple = templateConfig.list[idx].triples[0],
                                    predicateItem = {};

                                TripleComposer.wipeNotFixedItems();

                                if (triple.subject.selectedItem) {
                                    TripleComposer.addToSubject(item);
                                }

                                if (triple.object.forceFocus) {
                                    ResourcePanel.setSelector(triple.object.selectors);
                                    //TODO ASAP: handle this operation with TripleComposer.service
                                    setTimeout(function() {
                                        angular.element('span.pnd-statement-label[ng-click="onClickObject($event)"]').click();
                                    }, 300);
                                }

                                if (triple.predicate.uri) {
                                    predicateItem = ItemsExchange.getItemByUri(triple.predicate.uri);
                                    TripleComposer.addToPredicate(predicateItem);
                                }
                            };
                        })(i)
                    });
                }
            }
        }
    };

    resourceHandler.forceCompileButton = function(){
        var resourceElem = angular.element('.pnd-resource'); //find pnd-resource
        // add directive attribute
        promise = $q.defer();
        resourceElem.addClass('resource-menu');
        $compile(resourceElem)($rootScope);
        promise.resolve();

        setTimeout(function() {
            EventDispatcher.sendEvent('Pundit.forceCompileButton');
            $rootScope.$$phase || $rootScope.$digest();
        }, 10);

    };


        // add directive attribute
    resourceElem.addClass('resource-menu');
    //compile the DOM
    $compile(resourceElem)($rootScope);
    promise.resolve();

    initContextualMenu();

    return resourceHandler;
});