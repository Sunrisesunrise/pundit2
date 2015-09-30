angular.module('Pundit2.CommentPopover')
.service('CommentPopover', function(BaseComponent, PndPopover, $window, $timeout) {
    var commentPopover = new BaseComponent('CommentPopover');

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


    var resizeCallback = function() {
        // No last used info.
        if (resizeData.lastSelectionUsed === null) {
            return;
        }
        // Clear previous timeout.
        if (resizeData.removeTimeout !== null) {
            console.log("clear timeout");
            $timeout.cancel(resizeData.removeTimeout);
            resizeData.removeTimeout = null;
        }

        // Create temporary element if not present already.
        if (resizeData.temporaryElement === null) {
            resizeData.temporaryElement = angular.element('<span class="pnd-range-pos-calc" style="width: 0px;overflow: hidden;display: inline-flex;">w</span>');
            // Add temporary element at the and or beginning of fragment ref depending on last used selection.
            if (resizeData.lastSelectionUsed.label === 'end') {
                resizeData.lastSelectionUsed.fragmentRef.after(resizeData.temporaryElement);
            }
            else {
                resizeData.lastSelectionUsed.fragmentRef.before(resizeData.temporaryElement);
            }
        }

        resizeData.lastSelectionUsed.offset = angular.copy(resizeData.temporaryElement.offset());
        changePopoverPosition(resizeData.lastSelectionUsed.offset.left, resizeData.lastSelectionUsed.offset.top);

        resizeData.removeTimeout = $timeout(function() {
            console.log("remove temporary element");
            var parentTS = resizeData.temporaryElement.parent();
            resizeData.temporaryElement.remove();
            resizeData.temporaryElement = null;
            if (parentTS.length) {
                parentTS[0].normalize();
            }
            resizeData.removeTimeout = null;
        }, 300);
    };

    var changePopoverPosition = function(mouseX, mouseY){
        var state = PndPopover.getState(),
            distanceFromSelectionStart = Math.pow(parseInt(mouseX - state.selectionStart.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionStart.offset.top), 2),
            distanceFromSelectionEnd = Math.pow(parseInt(mouseX - state.selectionEnd.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionEnd.offset.top), 2),
            popoverRect = state.popover.$element[0].getClientRects()[0];

        function checkFromBottom(topInfoWhen) {
            var pageVisibleBottom = $window.innerHeight + $window.scrollY;
            if ($window.scrollY + popoverRect.bottom > pageVisibleBottom) {
                if (typeof topInfoWhen !== 'undefined' && typeof topInfoWhen.right !== 'undefined') {
                    state.anchor.css('top', topInfoWhen.right+'px');
                }
                popoverRect = changePopoverPlacement(state, 'right');
                var pageVisibleRight = $window.innerWidth + $window.scrollX;
                if ($window.scrollX + popoverRect.right > pageVisibleRight) {
                    if (typeof topInfoWhen !== 'undefined' && typeof topInfoWhen.top !== 'undefined') {
                        state.anchor.css('top', topInfoWhen.top+'px');
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
                top: (state.selectionEnd.offset.top + state.selectionEnd.height)+'px',
                left: state.selectionEnd.offset.left+'px'
            });
            resizeData.lastSelectionUsed = state.selectionEnd;
            popoverRect = changePopoverPlacement(state, 'bottom');
            checkFromBottom({
                right: (state.selectionEnd.offset.top + state.selectionEnd.height / 2),
                top: state.selectionEnd.offset.top
            });
        }
        else {
            state.anchor.css({
                top: (state.selectionStart.offset.top)+'px',
                left: state.selectionStart.offset.left+'px'
            });
            resizeData.lastSelectionUsed = state.selectionStart;
            popoverRect = changePopoverPlacement(state, 'top');
            var pageVisibleTop = $window.scrollY;
            if ($window.scrollY + popoverRect.top < pageVisibleTop) {
                state.anchor.css({
                    top: (state.selectionStart.offset.top + state.selectionStart.height / 2)+'px',
                    left: state.selectionStart.offset.left+'px'
                });
                resizeData.lastSelectionUsed = state.selectionStart;
                popoverRect = changePopoverPlacement(state, 'left');
                var pageVisibleLeft = $window.scrollX;
                if ($window.scrollX + popoverRect.left < pageVisibleLeft) {
                    state.anchor.css({
                        top: (state.selectionStart.offset.top + state.selectionStart.height)+'px',
                        left: state.selectionStart.offset.left+'px'
                    });
                    resizeData.lastSelectionUsed = state.selectionStart;
                    popoverRect = changePopoverPlacement(state, 'bottom');
                }
            }
        }

    };

    commentPopover.lastUsedNotebookID = undefined;

    commentPopover.show = function(x, y, item, unUsed, fragmentId) {
        var options = {
            templateUrl: 'src/CommentPopover/CommentPopover.tmpl.html',
            controller: 'CommentPopoverCtrl',
            placement: 'bottom',
            alphaRollover: true,
            lockPageScroll: true,
            hideCallback: function() {
                console.log("comment popover hide");
                angular.element($window).off('resize', resizeCallback);
            }
        };
        var promise = PndPopover.show(x, y, options, {item: item, fragmentId: fragmentId});
        promise.then(function() {
            changePopoverPosition(x, y);
            PndPopover.getState().selection.removeAllRanges();
            angular.element($window).on('resize', resizeCallback);
        }, function() {
            console.log(arguments);
        });
        return promise;
    };

    return commentPopover;
});