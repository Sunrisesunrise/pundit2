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
        // No last used info.
        if (resizeData.lastSelectionUsed === null) {
            return;
        }
        // Clear previous timeout.
        if (resizeData.removeTimeout !== null) {
            $timeout.cancel(resizeData.removeTimeout);
            resizeData.removeTimeout = null;
        }

        // Create temporary element if not present already.
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

        resizeData.removeTimeout = $timeout(function() {
            annotationPopover.log('Remove temporary element');
            var parentTS = resizeData.temporaryElement.parent();
            resizeData.temporaryElement.remove();
            resizeData.temporaryElement = null;
            if (parentTS.length) {
                parentTS[0].normalize();
            }
            resizeData.removeTimeout = null;
        }, 300);
    };

    var changePopoverPosition = function(mouseX, mouseY) {
        var state = PndPopover.getState(),
            distanceFromSelectionStart = Math.pow(parseInt(mouseX - state.selectionStart.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionStart.offset.top), 2),
            distanceFromSelectionEnd = Math.pow(parseInt(mouseX - state.selectionEnd.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionEnd.offset.top), 2),
            popoverRect = state.popover.$element[0].getClientRects()[0];

        function checkFromBottom(topInfoWhen) {
            var pageVisibleBottom = $window.innerHeight + $window.scrollY,
                wrongArrowFix = false;
            if (state.popover.$element.find('.arrow').css('left').indexOf('-') !== -1) {
                wrongArrowFix = true;
            }
            if (wrongArrowFix || $window.scrollY + popoverRect.bottom > pageVisibleBottom) {
                if (typeof topInfoWhen !== 'undefined' && typeof topInfoWhen.right !== 'undefined') {
                    state.anchor.css('top', topInfoWhen.right + 'px');
                }
                popoverRect = changePopoverPlacement(state, 'right');
                var pageVisibleRight = $window.innerWidth + $window.scrollX;
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
        }

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
            var wrongArrowFix = false;
            if (state.popover.$element.find('.arrow').css('left').indexOf('-') !== -1) {
                wrongArrowFix = true;
            }
            var pageVisibleTop = $window.scrollY;
            if (wrongArrowFix || $window.scrollY + popoverRect.top < pageVisibleTop) {
                state.anchor.css({
                    top: (state.selectionStart.offset.top + state.selectionStart.height / 2) + 'px',
                    left: state.selectionStart.offset.left + 'px'
                });
                resizeData.lastSelectionUsed = state.selectionStart;
                popoverRect = changePopoverPlacement(state, 'left');
                var pageVisibleLeft = $window.scrollX;
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
    };

    annotationPopover.lastUsedNotebookID = undefined;

    annotationPopover.show = function(x, y, item, unUsed, fragmentId, mode) {
        var options = {
            templateUrl: 'src/AnnotationPopover/AnnotationPopover.tmpl.html',
            controller: 'AnnotationPopoverCtrl',
            placement: 'bottom',
            alphaRollover: true,
            lockPageScroll: true,
            needsValidSelection:(item.isTextFragment())?true:false,
            hideCallback: function() {
                annotationPopover.log('Annotation popover hide');
                angular.element($window).off('resize', resizeCallback);
            }
        };
        var promise = PndPopover.show(x, y, options, {
            item: item,
            fragmentId: fragmentId
        });
        var state = PndPopover.getState();

        annotationPopover.mode = typeof mode === 'undefined' ? '' : mode;

        if (promise !== false) {
            promise.then(function() {
                if(state.popoverOptions.needsValidSelection){
                    changePopoverPosition(x, y);
                    PndPopover.getState().selection.removeAllRanges();
                    resizeCallback();
                    angular.element($window).on('resize', resizeCallback);
                    $timeout(function() {
                        resizeCallback();
                    }, 15);
                }
            }, function() {
                annotationPopover.log(arguments);
            });
        }
        return promise;
    };

    return annotationPopover;
});