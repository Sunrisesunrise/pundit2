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
        fragmentId: ''
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
    var eventHandler = null;

    var calculateSelectionCoordinates = function() {
        var range = state.selection.getRangeAt(0),
            ts = angular.element('<span class="pnd-range-pos-calc" style="width: 0px; overflow: hidden;display: inline-flex;">w</span>'),
            te = angular.element('<span class="pnd-range-pos-calc" style="width: 0px; overflow: hidden;display: inline-flex;">w</span>'),
            b = angular.element('<div class="pnd-range-boundary"></div>'),
            rangeRect = range.getBoundingClientRect();
        b.css({
            position: 'absolute',
            top: $window.scrollY + rangeRect.top,
            left: $window.scrollX + rangeRect.left,
            width: rangeRect.width,
            height: rangeRect.height,
            border: '1px solid red'
        });

        //angular.element('body').append(b);

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

        var clonedRange = range.cloneRange();
        clonedRange.endContainer = clonedRange.startContainer;
        clonedRange.endOffset = clonedRange.startOffset;
        //clonedRange.insertNode(ts[0]);
        var parentTStart = ts.parent();

        range.collapse(false);
        //range.insertNode(te[0]);
        var parentTEnd = te.parent();

        state.selectionStart = {
            offset: angular.copy(ts.offset()),
            //offset: ts.offset(),
            width: ts.width(),
            height: ts.height(),
        };
        state.selectionEnd = {
            offset: angular.copy(te.offset()),
            //offset: te.offset(),
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

    /**
    pndPopover.setArrowMargin = function(marginLeft, marginTop, marginRight, marginBottom) {
        if (state.popover === null || typeof state.popover.$scope === 'undefined') {
            return;
        }
        var margin = {
            "arrowMarginLeft": marginLeft,
            "arrowMarginTop": marginTop,
            "arrowMarginRight": marginRight,
            "arrowMarginBottom": marginBottom
        };
        for (var i in margin) {
            if (typeof margin[i] === 'undefined' || margin[i] === null) {
                margin[i] = 'initial';
            }
            state.popover.$scope[i] = margin[i];
        }
    }
     */

    return pndPopover;
});