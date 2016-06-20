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
            var showHandler, hideHandler, wipeHandler;

            var currentUri = element.attr('about');

            var init = function() {
                scope.element = element;
                scope.item = null;
                scope.number = 0;
                scope.annotationButton = ResourceAnnotator.options.annotationButton;
                scope.resourceLabel = '';
                scope.enabled = false;

                if (scope.annotationButton) {
                    scope.resourceLabel = ResourceAnnotator.options.annotationButtonLabel;
                }

                ResourceAnnotator.removeReference(currentUri, scope);
                currentUri = element.attr('about');
                ResourceAnnotator.addReference(currentUri, scope);

                $rootScope.$$phase || scope.$apply();
            };

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

                $rootScope.$$phase || scope.$apply();
            };

            scope.increaseAnnotationNumber = function() {
                scope.number++;
                $rootScope.$$phase || scope.$apply();
            };

            scope.decreaseAnnotationNumber = function() {
                scope.number--;
                $rootScope.$$phase || scope.$apply();
            };

            scope.clickHandler = function(evt) {
                if (!scope.enabled) {
                    scope.enabled = true;

                    if (Config.modules.Client.hiddenBootstrap) {
                        var contributionsMessage = Config.contributions.active ? '<br/><br/>By logging in you agree to the <a target="_blank" href=" ' + Config.contributions.link + ' ">' + Config.contributions.textLink + '</a>.' : '';

                        EventDispatcher.sendEvent('Pundit.alert', {
                            title: 'Please log in',
                            id: 'INFO',
                            timeout: Config.contributions.active ? 5000 : 3000,
                            message: 'Log in or register to Pundit to save your annotations and see your private notebooks.' + contributionsMessage
                        });
                        return;
                    }
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

            init();

            showHandler = EventDispatcher.addListener('Client.show', function() {
                changeButtonLabel(ResourceAnnotator.options.annotationButtonLabelAfterClick);
            });

            hideHandler = EventDispatcher.addListener('Client.hide', function() {
                if (scope.annotationButton) {
                    scope.resourceLabel = ResourceAnnotator.options.annotationButtonLabel;
                }
            });

            wipeAll = EventDispatcher.addListener('Client.wipeAll', function() {
                init();
            });

            element.on('$destroy', function() {
                EventDispatcher.removeListener(showHandler);
                EventDispatcher.removeListener(hideHandler);
                EventDispatcher.removeListener(wipeHandler);
            });
        }
    };
});