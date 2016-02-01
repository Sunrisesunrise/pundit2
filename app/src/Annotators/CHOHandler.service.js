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
    cMenuType: 'CHOHandlerItem',

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
    labelMaxLength: 40,

    /**
     * @module punditConfig
     * @ngdoc object
     * @name modules#CHOHandler.useAsSubject
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
     * @name modules#CHOHandler.useAsObject
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

.service('CHOHandler', function(CHOHANDLERDEFAULTS, NameSpace, BaseComponent, Config,
    TextFragmentHandler, XpointersHelper, Item, $compile, $timeout, $rootScope, ContextualMenu, AnnotationPopover, TripleComposer, ItemsExchange, $q, EventDispatcher, ResourcePanel) {

    var CHO = new BaseComponent('CHOHandler', CHOHANDLERDEFAULTS);

    var CHOElem = angular.element('.pnd-resource'), //find pnd-resource
        promise = $q.defer();

    var initContextualMenu = function() {
        var templateConfig = Config.template;

        ContextualMenu.addAction({
            name: 'resComment',
            type: ['CHOHandlerItem'],
            label: 'Comment',
            showIf: function() {
                return true;
            },
            priority: 99,
            action: function(item) {
                var coordinates = ContextualMenu.getLastXY(),
                    fragmentId = ContextualMenu.getLastRef(),
                    CHOElem = angular.element("[about='" +item.uri+"']");
                CHOElem.addClass('pnd-range-pos-icon');
                AnnotationPopover.show(coordinates.x, coordinates.y, item, '', fragmentId, 'comment');
            }
        });

        ContextualMenu.addDivider({
            priority: 98,
            type: ['CHOHandlerItem']
        });

        if (CHO.options.useAsSubject) {
            ContextualMenu.addAction({
                name: 'resUseAsSubject',
                type: ['CHOHandlerItem'],
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

        if (CHO.options.useAsObject) {
            ContextualMenu.addAction({
                name: 'resUseAsObject',
                type: ['CHOHandlerItem'],
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
        if (CHO.options.useAsObject||CHO.options.useAsObject) {
            ContextualMenu.addDivider({
                priority: 95,
                type: ['CHOHandlerItem']
            });
        }
        if (templateConfig.active) {
            var prior = 90;

            for (var i = 0; i < templateConfig.list.length; i++) {
                if (templateConfig.list[i].types.indexOf('resource')) {
                    ContextualMenu.addAction({
                        name: templateConfig.list[i].label.replace(/\s/g, ''),
                        type: ['CHOHandlerItem'],
                        label: templateConfig.list[i].label,

                        showIf: function() {
                            return true;
                        },
                        priority: prior--,
                        action: (function(idx) {
                            return function(item) {
                                TripleComposer.wipeNotFixedItems();

                                var triple = templateConfig.list[idx].triples[0];
                                if (triple.subject.selectedItem) {
                                    TripleComposer.addToSubject(item);
                                }
                                if (triple.object.forceFocus) {
                                    ResourcePanel.setSelector(triple.object.selectors);
                                   //TODO ASAP: handle this operation with TripleComposer.service
                                    setTimeout(function(){
                                        angular.element('span.pnd-statement-label[ng-click="onClickObject($event)"]').click();
                                    }, 300);
                                }
                                if (triple.predicate.uri) {
                                    var item = ItemsExchange.getItemByUri(triple.predicate.uri);
                                    TripleComposer.addToPredicate(item);


                                }
                            }
                        })(i)
                    });
                }
            }
        }
    };

    //add directive attribute
    CHOElem.addClass('cho-menu');
 //   CHOElem.addClass('pnd-range-pos-icon');

    //compile the DOM
    $compile(CHOElem)($rootScope);
    promise.resolve();

    initContextualMenu();

    return CHO;
});