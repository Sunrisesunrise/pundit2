/*global $:false */

angular.module('Pundit2.Annotators')

    .directive('choMenu', function($rootScope, NameSpace, ContextualMenu,
                                   Toolbar, ImageHandler, ImageAnnotator, ItemsExchange, TemplatesExchange,
                                   TripleComposer, EventDispatcher, Item, XpointersHelper, AnnotationsExchange) {

        return {
            restrict: 'C',
            scope: {},
            templateUrl: 'src/Annotators/CHOMenu.dir.tmpl.html',
            replace:true,
            link: function(scope, element) {

                scope.element = element;
                scope.item = null;
                scope.selected = false;


                scope.isSelected = function() {
                    return scope.selected;
                }
                scope.myElement = function() {
                    return scope.element;
                }
                var createItemFromCHO = function(CHOElem) {
                    var values = {};

                    values.uri = CHOElem.attr('about');
                    values.cMenuType = "CHOHandlerItem";
                    values.label =  CHOElem.parent().text().trim();
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

                    ContextualMenu.show(evt.pageX, evt.pageY, scope.item, scope.item.cMenuType);
                    //TODO: destroy listener
                    EventDispatcher.addListeners(
                        [
                            'AnnotationsCommunication.deleteItems'
                        ],
                        function(e) {
                            if(e.args.length === 0){
                                return;
                            }
                            if(scope.item.uri === e.args[0].uri){
                                scope.selected = false;
                            }
                        });


                });

                //scope.url = attributes.pndResource;

                EventDispatcher.addListeners(
                    [
                        'Consolidation.consolidateAll',
                        'AnnotationsCommunication.saveAnnotation',
                    ],
                    function() {
                        var item = ItemsExchange.getItemByUri(element[0].getAttribute("about"));
                        if(typeof item !== "undefined"){
                            scope.selected = true;
                        }
                    });

            }
        };
    });