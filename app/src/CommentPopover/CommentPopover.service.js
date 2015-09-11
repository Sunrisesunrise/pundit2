angular.module('Pundit2.CommentPopover')
.service('CommentPopover', function(BaseComponent, PndPopover, $window) {
    var commentPopover = new BaseComponent('CommentPopover');

    var changePopoverPlacement = function(state, placement) {
        state.popover.$options.placement = placement;
        state.popover.$element.removeClass('left').removeClass('top').removeClass('right').removeClass('bottom');
        state.popover.$applyPlacement();
        var popoverRect = state.popover.$element[0].getClientRects()[0];
        return popoverRect;
    };

    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    // TODO: remove deprecated code after testing and validation!!!!
    var changePopoverPosition = function(mouseX, mouseY){
        var state = PndPopover.getState(),
            distanceFromSelectionStart = Math.pow(parseInt(mouseX - state.selectionStart.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionStart.offset.top), 2),
            distanceFromSelectionEnd = Math.pow(parseInt(mouseX - state.selectionEnd.offset.left), 2) + Math.pow(parseInt(mouseY - state.selectionEnd.offset.top), 2),
            popoverRect = state.popover.$element[0].getClientRects()[0],
            range = state.selection.getRangeAt(0),
            rangeRect = range.getBoundingClientRect(),
            distanceFromSelectionTopRect = Math.pow(parseInt(mouseY - ($window.scrollY + rangeRect.top)), 2),
            distanceFromSelectionBottomRect = Math.pow(parseInt(mouseY - ($window.scrollY + rangeRect.bottom)), 2);

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

        /*if (distanceFromSelectionTopRect < distanceFromSelectionBottomRect && distanceFromSelectionTopRect <= distanceFromSelectionEnd && distanceFromSelectionTopRect <= distanceFromSelectionStart)  {
            state.anchor.css({
                top: state.selectionStart.offset.top+'px',
                left: state.selectionStart.offset.left+'px'
            });
            popoverRect = changePopoverPlacement(state, 'top');
            var pageVisibleTop = $window.scrollY;
            if ($window.scrollY + popoverRect.top < pageVisibleTop) {
                var y = state.selectionStart.offset.top + state.selectionStart.height;
                state.anchor.css('top', (y)+'px');
                popoverRect = changePopoverPlacement(state, 'bottom');
            }
        }
        else if (distanceFromSelectionBottomRect <= distanceFromSelectionEnd && distanceFromSelectionBottomRect <= distanceFromSelectionStart)  {
            state.anchor.css({
                top: (state.selectionEnd.offset.top + state.selectionEnd.height)+'px',
                left: state.selectionEnd.offset.left+'px'
            });
            popoverRect = changePopoverPlacement(state, 'bottom');
            checkFromBottom({
                top: (state.selectionEnd.offset.top - state.selectionEnd.height*3/2),
                right: (state.selectionEnd.offset.top + state.selectionEnd.height/2)
            });
            //state.anchor.css('top', (state.selectionEnd.offset.top - state.selectionEnd.height)+'px');
            //popoverRect = changePopoverPlacement(state, 'top');
        }
        else */if (distanceFromSelectionEnd <= distanceFromSelectionStart) {
            state.anchor.css({
                top: (state.selectionEnd.offset.top + state.selectionEnd.height)+'px',
                left: state.selectionEnd.offset.left+'px'
            });
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
            popoverRect = changePopoverPlacement(state, 'top');
            var pageVisibleTop = $window.scrollY;
            if ($window.scrollY + popoverRect.top < pageVisibleTop) {
                state.anchor.css({
                    top: (state.selectionStart.offset.top + state.selectionStart.height / 2)+'px',
                    left: state.selectionStart.offset.left+'px'
                });
                popoverRect = changePopoverPlacement(state, 'left');
                var pageVisibleLeft = $window.scrollX;
                if ($window.scrollX + popoverRect.left < pageVisibleLeft) {
                    state.anchor.css({
                        top: (state.selectionStart.offset.top + state.selectionStart.height)+'px',
                        left: state.selectionStart.offset.left+'px'
                    });
                    popoverRect = changePopoverPlacement(state, 'bottom');
                }
            }
        }

    };

    commentPopover.lastUsedNotebookID = undefined;

    commentPopover.show = function(x, y, item) {
        var options = {
            templateUrl: 'src/CommentPopover/CommentPopover.tmpl.html',
            controller: 'CommentPopoverCtrl',
            placement: 'bottom',
            alphaRollover: true
        };
        var promise = PndPopover.show(x, y, options, item);
        promise.then(function() {
            changePopoverPosition(x, y);
            PndPopover.getState().selection.removeAllRanges();
        }, function() {
            console.log(arguments);
        });
        return promise;
    };

    return commentPopover;
});