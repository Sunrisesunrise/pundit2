/*global $:false */

angular.module('Pundit2.Annotators')

    .directive('choMenu', function($rootScope, NameSpace, ContextualMenu,
        Toolbar, ImageHandler, ImageAnnotator, ItemsExchange, TemplatesExchange,
        TripleComposer, EventDispatcher, Item) {

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
                    values.label = "field";

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
                            if (triples[i].predicate.suggestedSubcjetTypes.indexOf(NameSpace.types.image) === -1) {
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
                        name: 'Opens comment tooltip',
                        type: ["CHOHandlerItem"],
                        label: 'Comment',
                        showIf: function() {
                            return true;
                        },
                        priority: 99
                    });
                    ContextualMenu.addDivider({
                        priority: 98,
                        type: ["CHOHandlerItem"]
                    });
                    ContextualMenu.addAction({
                        name: 'Compiles triples composer sbj',
                        type: ["CHOHandlerItem"],
                        label: 'Use as subject',
                        showIf: function() {
                            return true;
                        },
                        priority: 97
                    });
                    ContextualMenu.addAction({
                        name: 'Compiles triples composer obj',
                        type: ["CHOHandlerItem"],
                        label: 'Use as Object',
                        showIf: function() {
                            return true;
                        },
                        priority: 96
                    });
                    ContextualMenu.addAction({
                        name: 'Add entity to favourites',
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
                        name: 'First template',
                        type: ["CHOHandlerItem"],
                        label: 'Template1',
                        showIf: function() {
                            return true;
                        },
                        priority: 93
                    });
                    ContextualMenu.addAction({
                        name: 'Second template',
                        type: ["CHOHandlerItem"],
                        label: 'Template2',
                        showIf: function() {
                            return true;
                        },
                        priority: 93
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