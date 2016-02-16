angular.module('Pundit2.AnnotationPopover')

.service('AnnotationPopover', function(BaseComponent, PndPopover, $window, $timeout) {
    var annotationPopover = new BaseComponent('AnnotationPopover');

    var changePopoverPlacement = function(state, placement) {
        state.popover.$options.placement = placement;
        state.popover.$element.removeClass('left').removeClass('top').removeClass('right').removeClass('bottom');
        state.popover.$applyPlacement();
        var popoverRect = state.popover.$element[0].getClientRects()[0];
        return popoverRect;
    };

    var resizeData = {
        lastSelectionUsed: null,
        temporaryElement: null,
        removeTimeout: null
    };

    annotationPopover.mode = '';

    annotationPopover.doResize = function() {
        resizeCallback();
    };

    var resizeCallback = function() {
        var state = PndPopover.getState(),
            elem = 'undefined',
            pos = {},
            parentTS = 'undefined';

        if (typeof state.data === 'undefined') {
            return;
        }

        // No last used info.
        if (resizeData.lastSelectionUsed === null) {
            return;
        }

        // Clear previous timeout.
        if (resizeData.removeTimeout !== null) {
            $timeout.cancel(resizeData.removeTimeout);
            resizeData.removeTimeout = null;
        }

        if (!state.data.item.isTextFragment()) {
            //take icon position by class
            elem = angular.element('.pnd-range-pos-icon');
            pos = elem[0].getBoundingClientRect();

            resizeData.lastSelectionUsed.offset = angular.copy(elem.offset());
            changePopoverPosition(pos.left, pos.height);
        } else {

            // Create temporary element
            if (resizeData.temporaryElement === null) {
                resizeData.temporaryElement = angular.element('<span class="pnd-range-pos-calc" style="width: 0px;overflow: hidden;display: inline-flex;">w</span>');
                // Add temporary element at the and or beginning of fragment ref depending on last used selection.
                if (resizeData.lastSelectionUsed.label === 'end') {
                    resizeData.lastSelectionUsed.fragmentRef.after(resizeData.temporaryElement);
                } else {
                    resizeData.lastSelectionUsed.fragmentRef.before(resizeData.temporaryElement);
                }
            }

            resizeData.lastSelectionUsed.offset = angular.copy(resizeData.temporaryElement.offset());
            changePopoverPosition(resizeData.lastSelectionUsed.offset.left, resizeData.lastSelectionUsed.offset.top);
        }

        resizeData.removeTimeout = $timeout(function() {
            // state = PndPopover.getState();

            if (resizeData.temporaryElement !== null) {
                parentTS = resizeData.temporaryElement.parent();
                resizeData.temporaryElement.remove();
                resizeData.temporaryElement = null;
                
                if (parentTS.length) {
                    parentTS[0].normalize();
                }
                resizeData.removeTimeout = null;
            } 

            annotationPopover.log('Remove temporary element');
        }, 300);
    };

    var changePopoverPosition = function(mouseX, mouseY) {
        // TODO: how many time this function is called? why? 

        var state = PndPopover.getState(),
            elem = 'undefined',
            posArrow = {},
            posArrowTop = 0,
            posArrowLeft = 0,
            pageVisibleTop = 0,
            pageVisibleLeft = 0,
            distanceFromSelectionStart = 0,
            distanceFromSelectionEnd = 0,
            placementArrow = '',
            wrongArrowFix = false,
            popoverRect = {};

        var checkFromBottom = function(topInfoWhen) {
            var pageVisibleBottom = $window.innerHeight + $window.scrollY,
                pageVisibleRight = $window.innerWidth + $window.scrollX;
            wrongArrowFix = false;

            if (state.popover.$element.find('.arrow').css('left').indexOf('-') !== -1) {
                wrongArrowFix = true;
            }
            if (wrongArrowFix || $window.scrollY + popoverRect.bottom > pageVisibleBottom) {
                if (typeof topInfoWhen !== 'undefined' && typeof topInfoWhen.right !== 'undefined') {
                    state.anchor.css('top', topInfoWhen.right + 'px');
                }

                popoverRect = changePopoverPlacement(state, 'right');

                if ($window.scrollX + popoverRect.right > pageVisibleRight) {
                    if (typeof topInfoWhen !== 'undefined' && typeof topInfoWhen.top !== 'undefined') {
                        state.anchor.css('top', topInfoWhen.top + 'px');
                    }

                    popoverRect = changePopoverPlacement(state, 'top');

                    return true;
                }

                return true;
            }

            return false;
        };

        var checkRight = function(posArrow) {
            var pageVisibleRight = $window.innerWidth + $window.scrollX,
                popoverRect = changePopoverPlacement(state, 'right');

            if ($window.scrollX + popoverRect.right > pageVisibleRight) {
                state.anchor.css({
                    top: (posArrow.top + posArrow.height),
                    left: (posArrow.left + posArrow.width / 2)
                });
                changePopoverPlacement(state, 'bottom');

                return true;
            }

            return false;
        };

        // TODO: check for this check? 
        if (!state.data.item.isTextFragment()) {
            // if(typeof elem === "undefined"){
            //    elem = angular.element("[fragment='" + state.data.fragmentId + "']");
            // }

            // TODO: umh
            elem = angular.element('.pnd-range-pos-icon');
            posArrow = elem[0].getBoundingClientRect();
            posArrowTop = posArrow.top + posArrow.height / 2;
            posArrowLeft = posArrow.left + posArrow.width;
            
            // TODO: umh
            placementArrow = "right";

            // TODO: ?
            state.x = posArrow.left;
            state.y = posArrow.top;

            // TODO: drug?
            state.anchor.css({
                top: (posArrowTop),
                left: (posArrowLeft)
            });

            resizeData.lastSelectionUsed = {
                top: posArrowTop,
                left: posArrowLeft,
                // TODO: tralalala
            };

            resizeData.lastSelectionUsed.label = placementArrow;
            popoverRect = changePopoverPlacement(state, placementArrow);
            checkRight(posArrow);

            // TODO: gnawn
            if (state.popover.$element.find('.arrow').css('left').indexOf('-') !== -1) {
                wrongArrowFix = true;
            }

            // TODO: .. a = b, use b and then let me introduce a for a quick 'hello, nice to see you today'
            pageVisibleTop = $window.scrollY;

            if (wrongArrowFix || $window.scrollY + popoverRect.top < pageVisibleTop) {
                state.anchor.css({
                    top: $window.scrollY + posArrowTop + 'px',
                    left: posArrowLeft + 'px'
                });

                resizeData.lastSelectionUsed = state.selectionStart;
                popoverRect = changePopoverPlacement(state, "right");

                // TODO: and again .. 
                pageVisibleLeft = $window.scrollX;

                if ($window.scrollX + popoverRect.left < pageVisibleLeft) {
                    state.anchor.css({
                        top: posArrow.top + 'px',
                        left: posArrow.left + 'px'
                    });

                    resizeData.lastSelectionUsed = state.selectionStart;
                    popoverRect = changePopoverPlacement(state, "bottom");
                }
            }
        } else {
            distanceFromSelectionStart = Math.pow(parseInt(mouseX - state.selectionStart.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionStart.offset.top), 2);
            distanceFromSelectionEnd = Math.pow(parseInt(mouseX - state.selectionEnd.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionEnd.offset.top), 2);
            popoverRect = state.popover.$element[0].getClientRects()[0];


            if (distanceFromSelectionEnd <= distanceFromSelectionStart) {

                state.anchor.css({
                    top: (state.selectionEnd.offset.top + state.selectionEnd.height) + 'px',
                    left: state.selectionEnd.offset.left + 'px'
                });

                resizeData.lastSelectionUsed = state.selectionEnd;
                popoverRect = changePopoverPlacement(state, 'bottom');
                checkFromBottom({
                    right: (state.selectionEnd.offset.top + state.selectionEnd.height / 2),
                    top: state.selectionEnd.offset.top
                });
            } else {
                state.anchor.css({
                    top: (state.selectionStart.offset.top) + 'px',
                    left: state.selectionStart.offset.left + 'px'
                });

                resizeData.lastSelectionUsed = state.selectionStart;
                popoverRect = changePopoverPlacement(state, 'top');

                wrongArrowFix = false;

                if (state.popover.$element.find('.arrow').css('left').indexOf('-') !== -1) {
                    wrongArrowFix = true;
                }

                pageVisibleTop = $window.scrollY;

                if (wrongArrowFix || $window.scrollY + popoverRect.top < pageVisibleTop) {
                    state.anchor.css({
                        top: (state.selectionStart.offset.top + state.selectionStart.height / 2) + 'px',
                        left: state.selectionStart.offset.left + 'px'
                    });

                    resizeData.lastSelectionUsed = state.selectionStart;
                    popoverRect = changePopoverPlacement(state, 'left');
                    pageVisibleLeft = $window.scrollX;

                    if ($window.scrollX + popoverRect.left < pageVisibleLeft) {
                        state.anchor.css({
                            top: (state.selectionStart.offset.top + state.selectionStart.height) + 'px',
                            left: state.selectionStart.offset.left + 'px'
                        });

                        resizeData.lastSelectionUsed = state.selectionStart;
                        popoverRect = changePopoverPlacement(state, 'bottom');
                    }
                }
            }
        }
    };

    annotationPopover.lastUsedNotebookID = undefined;

    annotationPopover.hide = function() {
        var elem = angular.element('.pnd-range-pos-icon');

        elem.removeClass('pnd-range-pos-icon');
        angular.element($window).off('resize', resizeCallback);

        // TODO: why PndPopover.hide() is not used here?

        annotationPopover.log('Annotation popover hide');
    };

    annotationPopover.show = function(x, y, item, opt, fragmentId, mode) {
        var options,
            optionsDefault = {
                templateUrl: 'src/AnnotationPopover/AnnotationPopover.tmpl.html',
                controller: 'AnnotationPopoverCtrl',
                placement: 'bottom',
                alphaRollover: true,
                lockPageScroll: true,
                needsValidSelection: (item.isTextFragment()) ? true : false,
                hideCallback: function() {
                    annotationPopover.log('Annotation popover hide');
                    var elem = angular.element('.pnd-range-pos-icon');
                    elem.removeClass('pnd-range-pos-icon');
                    angular.element($window).off('resize', resizeCallback);
                }
            };

        options = angular.extend(optionsDefault, opt);

        var promise = PndPopover.show(x, y, options, {
            item: item,
            fragmentId: fragmentId
        });

        var state = PndPopover.getState();

        annotationPopover.mode = typeof mode === 'undefined' ? '' : mode;

        if (promise !== false) {
            promise.then(function() {
                changePopoverPosition(x, y);
                if (state.data.needsValidSelection) {
                    PndPopover.getState().selection.removeAllRanges();
                }
                resizeCallback();
                angular.element($window).on('resize', resizeCallback);


                $timeout(function() {
                    resizeCallback();
                }, 15);
            }, function() {
                annotationPopover.log(arguments);
            });
        }
        return promise;
    };

    return annotationPopover;
});