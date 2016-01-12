/*global $:false */

angular.module('Pundit2.Annotators')

    .directive('choMenu', function($rootScope, NameSpace, ContextualMenu,
                                   Toolbar, CHOHandler, CHOAnnotator, ItemsExchange, TemplatesExchange,
                                   TripleComposer, EventDispatcher) {

        return {
            restrict: 'E',
            scope: {
                ref: '@'
            },
            templateUrl: 'src/Annotators/CHOMenu.dir.tmpl.html',
            //replace: true,
            link: function(scope, element) {

                // reference to CHO dom element
                scope.CHO = angular.element(".pnd-CHO");
                // reference to directive dom element
                scope.element = element;
                // directive is showed after the consolidation of the page has been completed
                scope.visible = false;
                // item generated from image reference
                scope.item = null;
          // read CHO coordinate and position the directive
                var placeMenu = function() {
                    var CHOPos = scope.CHO.position();
                    scope.visible = true;
                    scope.element.css({
                        position: 'absolute',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.2)',
                        fontSize: '1.7em',
                        height: '30px',
                        width: '30px',
                        left: CHOPos.left,
                        top: CHOPos.top
                    });
                    scope.element.hover(
                        function() {
                            $(this).css({
                                color: '#333333',
                                // textShadow: '0px 0 25px #FFCC00'
                            });
                        },
                        function() {
                            $(this).css({
                                color: '#fff',
                                // textShadow: 'none'
                            });
                        }
                    );
                };
                placeMenu();

                scope.clickHandler = function(evt) {

                    evt.preventDefault();
                    evt.stopPropagation();

                    CHOHandler.clearTimeout();

                    if (scope.item === null) {
                        // create item only once
                        scope.item = CHOHandler.createItemFromImage(scope.image[0]);
                        ItemsExchange.addItemToContainer(scope.item, CHOHandler.options.container);
                    }


                    var item = ItemsExchange.getItemByUri(scope.item.uri);
                    ContextualMenu.show(evt.pageX, evt.pageY, item, CHOHandler.options.cMenuType);

                };

                scope.onMouseOver = function() {
                    CHOHandler.clearTimeout();
                };

                scope.onMouseLeave = function() {
                    CHOHandler.removeDirective();
                };

            } // link()
        };
    });