angular.module('Pundit2.Core')

.service('PndPopover', function(BaseComponent, EventDispatcher, $rootScope, $popover, $document, $q, $window) {
    var pndPopover = new BaseComponent('PndPopover');

    var initPopoverOptions = {
        trigger: 'manual',
        container: "[data-ng-app='Pundit2']"
    };

    var state = {
        selection: undefined,
        selectionStart: {},
        selectionEnd: {},
        data: undefined,
        x: 0,
        y: 0,
        popoverOptions: {},
        popover: null,
        anchor: null,
        fragmentId: '',
        scroll: {
            top: undefined,
            left: undefined
        }
    };

    var eventHandler = null;

    var calculateSelectionCoordinates = function() {
        var range = state.selection.getRangeAt(0),
            ts = angular.element('<span class="pnd-range-pos-calc" style="width: 0px; overflow: hidden;display: inline-flex;">w</span>'),
            te = angular.element('<span class="pnd-range-pos-calc" style="width: 0px; overflow: hidden;display: inline-flex;">w</span>');

        var fragmentElements = angular.element('span.' + state.fragmentId);
        var i = 0;
        for (; i < fragmentElements.length; i++) {
            if (fragmentElements.eq(i).text().trim().length === 0) {
                continue;
            }
            fragmentElements.eq(0).before(ts);
            break;
        }
        for (i = fragmentElements.length - 1; i >= 0; i--) {
            if (fragmentElements.eq(i).text().trim().length === 0) {
                continue;
            }
            fragmentElements.eq(i).after(te);
            break;
        }

        var parentTStart = ts.parent();
        var parentTEnd = te.parent();

        state.selectionStart = {
            offset: angular.copy(ts.offset()),
            width: ts.width(),
            height: ts.height(),
        };
        state.selectionEnd = {
            offset: angular.copy(te.offset()),
            width: te.width(),
            height: te.height(),
        };

        ts.remove();
        parentTStart[0].normalize();
        te.remove();
        parentTEnd[0].normalize();
    };

    var initPopover = function(x, y, options, data) {
        state.data = data;

        state.popoverOptions = angular.merge({}, initPopoverOptions, options);

        if (state.anchor === null)  {
            state.anchor = angular.element("<div class='pnd-pnd-popover-anchor' style='position: absolute; left: 0px; top: 0px;'><div>");
            angular.element("[data-ng-app='Pundit2']").prepend(state.anchor);
        }

        pndPopover.setAnchorPosition(x, y);

        state.popover = $popover(state.anchor, state.popoverOptions);
        return state.popover;
    };

    var mouseUpHandler = function(evt) {
        var tagName = angular.element(evt.target).prop('tagName').toLowerCase();
        console.log(tagName);
        if (angular.element(evt.target).closest('.popover').length === 0 && tagName !== 'select') {
            hide();
        } else {
            evt.stopImmediatePropagation();
            //evt.stopPropagation();
            return false;
        }
    };

    var scrollHandler = function() {
        $(this).scrollTop(state.scroll.top).scrollLeft(state.scroll.left);
    };

    var show = function() {
        var selection = $document[0].getSelection();
        if (selection.baseNode === null) {
            console.log("skipping show .. no valid selection");
            return false;
        }

        state.selection = selection;

        if (eventHandler !== null) {
            EventDispatcher.removeListener(eventHandler);
        }
        eventHandler = EventDispatcher.addListener('XpointersHelper.NodeAdded', function(evt) {
            state.fragmentId = evt.args.fragments[0];
            EventDispatcher.removeListener(eventHandler);
            eventHandler = null;
        });

        EventDispatcher.sendEvent('TextFragmentHandler.addTemporarySelection');

        state.popover.show();

        var win = angular.element($window);
        state.scroll.top = win.scrollTop(),
        state.scroll.left = win.scrollLeft();

        if (state.popoverOptions.lockPageScroll) {
            win.on('scroll', scrollHandler);
        }
        $document.on('mouseup', mouseUpHandler);

        return true;
    };

    var hide = function() {
        // TODO: REMOVE THIS LINE !!!
        angular.element('.pnd-range-boundary').remove();

        if (eventHandler !== null) {
            EventDispatcher.removeListener(eventHandler);
            eventHandler = null;
        }
        $document.off('mouseup', mouseUpHandler);
        if (state.popover === null) {
            return;
        }
        state.popover.hide();
        if (state.popover) {
            state.popover.destroy();
        }
        state.popover = null;

        angular.element($window).off('scroll', scrollHandler);

        EventDispatcher.sendEvent('TextFragmentHandler.removeTemporarySelection');
    };

    pndPopover.show = function(x, y, options, data) {
        if (state.popover !== null) {
            hide();
        }
        state.popover = initPopover(x, y, options, data);
        var innerPromise = $q.defer();
        var promise = state.popover.$promise;
        promise.then(function() {
            if (show()) {
                calculateSelectionCoordinates();
                innerPromise.resolve();
            }
            else {
                innerPromise.reject();
            }
        });
        return innerPromise.promise;
    };

    pndPopover.hide = function() {
        hide();
    };

    pndPopover.setAnchorPosition = function(x, y) {
        state.x = x;
        state.y = y;
        if (state.anchor !== null)  {
            state.anchor.css({
                left: x,
                top: y
            });
        }
    };

    pndPopover.getAnchorPosition = function() {
        return {
            x: state.x,
            y: state.y
        };
    };

    pndPopover.getData = function() {
        return state.data;
    };

    pndPopover.getState = function() {
        return state;
    };

    return pndPopover;
});