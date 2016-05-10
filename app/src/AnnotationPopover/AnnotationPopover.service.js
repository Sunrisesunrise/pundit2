angular.module('Pundit2.AnnotationPopover')

.service('AnnotationPopover', function(BaseComponent, PndPopover, $window, $timeout, EventDispatcher, Atoka) {
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
    annotationPopover.atokaMode = Atoka.options.active;

    annotationPopover.doResize = function() {
        resizeCallback();
    };

    var resizeCallback = function() {
        var state = PndPopover.getState(),
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

        if (typeof state.data.elemReference !== 'undefined') {
            //take icon position by class
            pos = state.data.elemReference[0].getBoundingClientRect();
            resizeData.lastSelectionUsed.offset = angular.copy(state.data.elemReference.offset());

            changePopoverPosition(pos.left, pos.height, state.data.elemReference);
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

    var changePopoverPosition = function(mouseX, mouseY, iconReference) {
        // TODO: how many time this function is called? why?

        var state = PndPopover.getState(),
            posArrow = {},
            posArrowTop = 0,
            posArrowLeft = 0,
            pageVisibleTop = 0,
            pageVisibleLeft = 0,
            distanceFromSelectionStart = 0,
            distanceFromSelectionEnd = 0,
            popoverRight = 0,
            placementArrow = state.popoverOptions.placement,
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
            var pageVisibleRight = $window.innerWidth + $window.scrollX;

            if ($window.scrollX + popoverRight > pageVisibleRight) {
                state.anchor.css({
                    top: ($window.scrollY + posArrow.top + posArrow.height),
                    left: ($window.scrollX + posArrow.left + posArrow.width / 2)
                });
                changePopoverPlacement(state, 'bottom');

                return true;
            }
            return false;
        };

        if (typeof iconReference !== 'undefined') {

            posArrow = iconReference[0].getBoundingClientRect();

            if (placementArrow === 'right') {
                posArrowTop = $window.scrollY + posArrow.top + posArrow.height / 2;
                posArrowLeft = $window.scrollX + posArrow.left + posArrow.width;
            } else {
                //placementArrow == 'top'
                posArrowTop = $window.scrollY + posArrow.top;
                posArrowLeft = $window.scrollX + posArrow.left + posArrow.width / 2;
            }

            // set first anchor and lastSelectionUsed for maintain consistency with textfragment mode
            state.anchor.css({
                top: posArrowTop + 'px',
                left: posArrowLeft + 'px'
            });

            resizeData.lastSelectionUsed = {
                top: posArrowTop + 'px',
                left: posArrowLeft + 'px'
            };

            resizeData.lastSelectionUsed.label = placementArrow;
            popoverRect = changePopoverPlacement(state, placementArrow);
            popoverRight = popoverRect.right;
            checkRight(posArrow);

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

    annotationPopover.show = function(x, y, item, opt, fragmentId, mode, iconReference) {
        var options,
            optionsDefault = {
                templateUrl: 'src/AnnotationPopover/AnnotationPopover.tmpl.html',
                controller: 'AnnotationPopoverCtrl',
                placement: 'right',
                alphaRollover: true,
                lockPageScroll: true,
                needsValidSelection: (item.isTextFragment()) ? true : false,
                hideCallback: function() {
                    annotationPopover.log('Annotation popover hide');
                    var elem = angular.element('.pnd-range-pos-icon');
                    elem.removeClass('pnd-range-pos-icon');
                    angular.element($window).off('resize', resizeCallback);

                    if (typeof mode !== 'undefined' && mode === 'alert') {
                        EventDispatcher.sendEvent('closeContextualMenu');
                    }
                }
            };

        options = angular.extend(optionsDefault, opt);

        var promise = PndPopover.show(x, y, options, {
            item: item,
            fragmentId: fragmentId,
            elemReference: iconReference
        });

        var state = PndPopover.getState();
        annotationPopover.mode = typeof mode === 'undefined' ? '' : mode;

        if (promise !== false) {
            promise.then(function() {
                changePopoverPosition(x, y, iconReference);
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