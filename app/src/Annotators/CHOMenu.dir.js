/*global $:false */

angular.module('Pundit2.Annotators')

    .directive('choMenu', function($rootScope, NameSpace, ContextualMenu,
        Toolbar, ImageHandler, ImageAnnotator, ItemsExchange, TemplatesExchange,
        TripleComposer, EventDispatcher, Item, AnnotationPopover, XpointersHelper) {

        return {
            restrict: 'C',
            scope: true,
            templateUrl: 'src/Annotators/CHOMenu.dir.tmpl.html',
            link: function(scope, element) {

                scope.element = element;
                scope.item = null;


                var createItemFromCHO = function(CHOElem) {
                    var values = {};

                    values.uri = CHOElem.attr('pnd-resource');
                    values.cMenuType = "CHOHandlerItem";
                    values.name  = "bla bla"
                    values.label =  CHOElem.attr('pnd-resource');
                    values.type = values.type = [NameSpace.types.resource]; // TODO to be defined
                    values.pageContext = XpointersHelper.getSafePageContext();

                    return new Item(values.uri, values);
                };

                element.on('click',  function (evt) {
                    if (scope.item === null) {
                        // create item only once
                        scope.item = createItemFromCHO(scope.element);
                        ItemsExchange.addItemToContainer(scope.item, "createdCHO");
                    }
                    if (Toolbar.isActiveTemplateMode()) {
                        var triples = TemplatesExchange.getCurrent().triples;
                        // verify that all predicates admit images as subject
                        // all template triples must be have a predicate
                        for (var i in triples) {
                            if (triples[i].predicate.suggestedSubcjetTypes.indexOf(NameSpace.types.resource) === -1) {
                                return;
                            }
                        }

                        TripleComposer.addToAllSubject(ItemsExchange.getItemByUri(scope.item.uri));
                        TripleComposer.closeAfterOp();
                        EventDispatcher.sendEvent('Annotators.saveAnnotation');
                        return;
                    }


                    var item = ItemsExchange.getItemByUri(scope.item.uri);
                    ContextualMenu.show(evt.pageX, evt.pageY, item, scope.item.cMenuType);
                });

                //scope.url = attributes.pndResource;

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

                 //read CHO coordinate and position the directive
                var overIcon = function() {
                    scope.element.css({
                        //color: gray
                        color: '#333333',
                    });
                    scope.element.hover(
                        function() {
                            $(this).css({
                                //color: yellow
                                color: '#F5B800',
                                cursor: 'pointer'
                            });
                        },
                        function() {
                            $(this).css({
                                //color: gray
                                color: '#333333',
                            });
                        }
                    );
                };
                overIcon();
                initContextualMenu();

            } // link()
        };
    });