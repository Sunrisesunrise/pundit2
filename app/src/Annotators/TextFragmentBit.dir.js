angular.module('Pundit2.Annotators')

.directive('textFragmentBit', function(TextFragmentAnnotator, $injector, AnnotationSidebar,  Config, $rootScope, $document, $window, Status) {
    return {
        restrict: 'A',
        scope: {
            fragments: '@'
        },
        link: function(scope, element) {
            var numberOfTextFragments = scope.fragments.split(",").length;
            element.addClass('pnd-textfragment-numbers-' + numberOfTextFragments);

            scope.bitId = new Date().getTime() + Math.floor(Math.random() * 100000);
            scope.isHigh = false;
            
            scope.high = function() {
                element.addClass('pnd-textfragment-highlight');
            };
            scope.clear = function() {
                element.removeClass('pnd-textfragment-highlight');
            };

            scope.hide = function() {
                element.addClass('pnd-textfragment-hidden');
            };
            scope.show = function() {
                element.removeClass('pnd-textfragment-hidden');
            };

            scope.ghost = function() {
                element.addClass('pnd-textfragment-ghosted');
            };
            scope.expo = function() {
                element.removeClass('pnd-textfragment-ghosted');
            };

            TextFragmentAnnotator.updateFragmentBit(scope, 'add');
            element.on('click', function(){
                if(Config.modules.Client.hiddenBootstrap && !Status.getCanBeShowedAfterHidden()){
                    document.dispatchEvent(new CustomEvent("Pundit.showBootstrap"));
                }
            });

            if (Config.modules.AnnotationSidebar.active) {
                var AnnotationExchange = $injector.get('AnnotationsExchange'),
                    FragmentPopover = $injector.get('FragmentPopover'),
                    AnnotationDetails = $injector.get('AnnotationDetails');

                element.on('click', function(evt) {
//                    console.log(evt);

                    var fragments = element.attr('fragments'),
                        annotations = {},
                        arrow = {},
                        box;
                    if (typeof fragments !== 'undefined') {
                        fragments = fragments.split(',');
                        for (var fi in fragments) {
                            var uri = TextFragmentAnnotator.getFragmentUriById(fragments[fi]);
                            AnnotationExchange.getAnnotationsByItem(uri).forEach(function(ann) {
                                annotations[ann.id] = ann;
                            });
                        }
                    }
                    var link = {};
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

                    var annotationsKeys = Object.keys(annotations),
                        linkKeys = Object.keys(link);
                    if (annotationsKeys.length > 1 || linkKeys.length > 0) {
                        FragmentPopover.show(evt.pageX, y, data);

                        $rootScope.$$phase || $rootScope.$digest();
                        //TODO use conf value for 501 and 150
                        //501 is sidebar width + box width
                        if(($window.screen.availWidth - evt.pageX)<501 && AnnotationSidebar.isAnnotationSidebarExpanded()){
                            arrow = angular.element('.arrow')[0];
                            box = angular.element('.popover')[0];
                            //150 is sidebar width
                            box.style.left = evt.pageX - 150 + 'px';
                            arrow.style.left  = '50%';
                        }

                    } else {
                        AnnotationDetails.openAnnotationView(annotationsKeys[0]);
                        $rootScope.$$phase || $rootScope.$digest();                        
                    }

                    evt.stopImmediatePropagation();
                    return false;
                });
            }

            element.on('Pundit.updateFragmentBits', function(e, data) {
                scope.fragments = data;
                TextFragmentAnnotator.updateFragmentBit(scope, 'update');
            });

            element.on('$destroy', function() {
                TextFragmentAnnotator.updateFragmentBit(scope, 'remove');
            });

        } // link()
    };
});