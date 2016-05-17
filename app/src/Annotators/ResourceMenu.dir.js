angular.module('Pundit2.Annotators')

.directive('resourceMenu', function($rootScope, NameSpace, ContextualMenu,
    Toolbar, ImageHandler, ImageAnnotator, ItemsExchange, TemplatesExchange,
    TripleComposer, EventDispatcher, Item, XpointersHelper, AnnotationsExchange,
    ResourceAnnotator, Config) {

    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'src/Annotators/ResourceMenu.dir.tmpl.html',
        replace: true,
        link: function(scope, element) {
            var showHandler;

            scope.element = element;
            scope.item = null;
            scope.number = 0;
            scope.annotationButton = ResourceAnnotator.options.annotationButton;
            scope.resourceLabel = '';
            scope.enabled = false;

            if (scope.annotationButton) {
                scope.resourceLabel = ResourceAnnotator.options.annotationButtonLabel;
            }

            var createItemFromResource = function(resourceElem) {
                var values = {};

                values.uri = resourceElem.attr('about');
                values.cMenuType = 'resourceHandlerItem';
                values.label = resourceElem.parent().text().trim().split('\n')[0];
                values.type = values.type = [NameSpace.types.resource]; // TODO to be defined
                values.pageContext = XpointersHelper.getSafePageContext();
                values.icon = true;
                values.elem = resourceElem;

                return new Item(values.uri, values);
            };

            var changeButtonLabel = function(label) {
                scope.resourceLabel = label;
                $rootScope.$$phase || $rootScope.$digest();
            };

            scope.setAnnotationNumber = function(uri) {
                var annotations = AnnotationsExchange.getAnnotations();
                scope.number = 0;
                for (var ann in annotations) {
                    if (annotations[ann].entities[0] === uri) {
                        scope.number++;
                    }
                }
            };

            scope.addAnnotationNumber = function() {
                scope.number++;
            };

            scope.subAnnotationNumber = function() {
                scope.number--;
            };

            scope.myElement = function() {
                return scope.element;
            };

            scope.clickHandler = function(evt) {
                if (!scope.enabled) {
                    scope.enabled = true;
                    return;
                }

                if (scope.enabled || !Config.modules.Client.hiddenBootstrap) {

                    if (scope.item === null) {
                        // create item only once
                        scope.item = createItemFromResource(scope.element);
                        ItemsExchange.addItemToContainer(scope.item, 'createdResource');
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
                }
            };

            showHandler = EventDispatcher.addListener('Client.show', function() {
                changeButtonLabel(ResourceAnnotator.options.annotationButtonLabelAfterClick);
            });

            element.on('$destroy', function() {
                EventDispatcher.removeListener(showHandler);
            });

            ResourceAnnotator.addReference(element.attr('about'), scope);
        }
    };
});