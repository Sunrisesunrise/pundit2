angular.module('Pundit2.Annotators')

.directive('textFragmentBit', function(TextFragmentAnnotator, ImageAnnotator, $injector, Config, $document, $window) {

    return {
        restrict: 'A',
        scope: {
            fragments: '@'
        },
        link: function(scope, element) {
            var numberOfTextFragments = scope.fragments.split(",").length;
            var component;
            var labelComponent;
            if(typeof TextFragmentAnnotator === 'undefined'){
                component=TextFragmentAnnotator;
                labelComponent='text'
            }
            else{
                component=ImageAnnotator;
                labelComponent='image';

            };

            element.addClass('pnd-'+labelComponent+'fragment-numbers-' + numberOfTextFragments);

            scope.bitId = new Date().getTime() + Math.floor(Math.random() * 100000);
            scope.isHigh = false;
            
            scope.high = function() {
                element.addClass('pnd-'+labelComponent+'fragment-highlight');
            };
            scope.clear = function() {
                element.removeClass('pnd-'+labelComponent+'fragment-highlight');
            };

            scope.hide = function() {
                element.addClass('pnd-'+labelComponent+'fragment-hidden');
            };
            scope.show = function() {
                element.removeClass('pnd-'+labelComponent+'fragment-hidden');
            };

            scope.ghost = function() {
                element.addClass('pnd-'+labelComponent+'fragment-ghosted');
            };
            scope.expo = function() {
                element.removeClass('pnd-'+labelComponent+'fragment-ghosted');
            };

            component.updateFragmentBit(scope, 'add');

            if (Config.clientMode === 'lite') {
                var AnnotationExchange = $injector.get('AnnotationsExchange'),
                    FragmentPopover = $injector.get('FragmentPopover');

                element.on('click', function(evt) {
                    // console.log(evt);
                    var fragments = element.attr('fragments'),
                        annotations = {};
                    if (typeof fragments !== 'undefined') {
                        fragments = fragments.split(',');
                        for (var fi in fragments) {
                            var uri = component.getFragmentUriById(fragments[fi]);
                            AnnotationExchange.getAnnotationsByItem(uri).forEach(function(ann) {
                                annotations[ann.id] = ann;
                            });
                        }
                    }
                    var link;
                    if (element.parent()[0].tagName.toUpperCase() === 'A') {
                        link = {
                            url: element.parent().attr('href'),
                            target: element.parent().attr('target'),
                            element: element.parent()
                        };
                    }

                    var data = {
                        annotations: annotations,
                        link: link
                    };

                    var y = evt.pageY + 7;
                    if (typeof $document[0].caretRangeFromPoint !== 'undefined') {
                        var range = $document[0].caretRangeFromPoint(evt.clientX, evt.clientY);
                        if (range !== null) {
                            var t = angular.element('<div class="pnd-temp-click-fr" style="display: inline-flex;overflow-x: hidden;width: 0px;">&nbsp;</div>');
                            range.insertNode(t[0]);
                            y = $window.scrollY + t[0].getClientRects()[0].bottom;
                            var tParent = t.parent();
                            t.remove();
                            if (tParent.length) {
                                tParent[0].normalize();
                            }
                        }
                    }

                    FragmentPopover.show(evt.pageX, y, data);

                    evt.stopImmediatePropagation();
                    return false;
                });
            }

            element.on('Pundit.updateFragmentBits', function(e, data) {
                scope.fragments = data;
                component.updateFragmentBit(scope, 'update');
            });

            element.on('$destroy', function() {
                component.updateFragmentBit(scope, 'remove');
            });

        } // link()
    };
});