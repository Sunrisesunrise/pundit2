angular.module('Pundit2.Core')

.service('PndPopover', function(BaseComponent, EventDispatcher, $rootScope, $popover, $document, $q, $window, $timeout) {
    var pndPopover = new BaseComponent('PndPopover');

    var initPopoverOptions = {
        trigger: 'manual',
        container: null,
        needsValidSelection: true,
        lockPageScroll: true
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
        },
        lockShow: false,
        lockShowRemoveTimeout: null
    };

    var eventHandler = null;

    var calculateSelectionCoordinates = function(data) {
        // var range = state.selection.getRangeAt(0)
        if(data.item.type[0] === "http://www.openannotation.org/ns/resource"){
            var ts = angular.element("span.pnd-resource[about='"+data.item.uri+"']");
            var i = 0;
            var pos = {
                beforeElem: null,
                afterElem: null
            };
            for (; i < ts.length; i++) {
                if (ts.eq(0).width() === 0 ) {
                    continue;
                }
                pos.beforeElem = ts.eq(i); //.before(ts);
                break;
            }
            for (i = ts.length - 1; i >= 0; i--) {
                if (ts.eq(0).width() === 0) {
                    continue;
                }
                pos.afterElem = ts.eq(i); //.after(te);
                break;
            }

            if (pos.beforeElem === null) {
                pos.beforeElem = ts.eq(0);
            }
            if (pos.afterElem === null) {
                pos.afterElem = ts.eq(ts.length - 1);
            }

            pos.beforeElem.before(ts);
            pos.afterElem.after(ts);
            var iconOffset = ts.offset();
            state.selectionStart = {
                label: 'start',
                offset: {left: iconOffset.left, top:iconOffset.top},
                fragmentRef: ts.eq(0),
                width: ts.eq(0).width(),
                height: ts.eq(0).height(),
            };
            state.selectionEnd = {
                label: 'end',
                offset: {left: iconOffset.left + ts.eq(0).width() , top: state.selectionStart.offset.top + ts.eq(0).height()},
                fragmentRef: ts.eq(0),
                width:   -ts.eq(0).width(),
                height:  -ts.eq(0).height,
            };
            return;
        }
        var ts = angular.element('<span class="pnd-range-pos-calc" style="width: 0px; overflow: hidden;display: inline-flex;">w</span>'),
            te = angular.element('<span class="pnd-range-pos-calc" style="width: 0px; overflow: hidden;display: inline-flex;">w</span>');
        var fragmentElements = angular.element('span.' + state.data.fragmentId);
        var i = 0;
        var pos = {
            beforeElem: null,
            afterElem: null
        };
        for (; i < fragmentElements.length; i++) {
            if (fragmentElements.eq(i).text().trim().length === 0 || !fragmentElements.eq(i).is(':visible')) {
                continue;
            }
            pos.beforeElem = fragmentElements.eq(i); //.before(ts);
            break;
        }
        for (i = fragmentElements.length - 1; i >= 0; i--) {
            if (fragmentElements.eq(i).text().trim().length === 0 || !fragmentElements.eq(i).is(':visible')) {
                continue;
            }
            pos.afterElem = fragmentElements.eq(i); //.after(te);
            break;
        }

        if (pos.beforeElem === null) {
            pos.beforeElem = fragmentElements.eq(0);
        }
        if (pos.afterElem === null) {
            pos.afterElem = fragmentElements.eq(fragmentElements.length - 1);
        }

        pos.beforeElem.before(ts);
        pos.afterElem.after(te);

        var parentTStart = ts.parent();
        var parentTEnd = te.parent();

        state.selectionStart = {
            label: 'start',
            offset: angular.copy(ts.offset()),
            fragmentRef: pos.beforeElem,
            width: ts.width(),
            height: ts.height(),
        };
        state.selectionEnd = {
            label: 'end',
            offset: angular.copy(te.offset()),
            fragmentRef: pos.afterElem,
            width: te.width(),
            height: te.height(),
        };

        ts.remove();
        if (parentTStart.length) {
            parentTStart[0].normalize();
        }
        te.remove();
        if (parentTEnd.length) {
            parentTEnd[0].normalize();
        }


    };

    var initPopover = function(x, y, options, data) {
        state.data = data;

        var container = angular.element('div[data-ng-app="Pundit2"]');
        state.popoverOptions = angular.merge({}, initPopoverOptions, options);
        state.popoverOptions.container = container;

        if (state.anchor === null) {
            state.anchor = angular.element("<div class='pnd-pnd-popover-anchor' style='position: absolute; left: 0px; top: 0px;'><div>");
            angular.element("[data-ng-app='Pundit2']").prepend(state.anchor);
        }

        pndPopover.setAnchorPosition(x, y);

        state.popover = $popover(state.anchor, state.popoverOptions);
        if (typeof options.scopeData !== 'undefined') {
            for (var key in options.scopeData) {
                state.popover.$scope[key] = options.scopeData[key];
            }
        }
        return state.popover;
    };

    var mouseUpHandler = function(evt) {
        var tagName = angular.element(evt.target).prop('tagName').toLowerCase();
        if (angular.element(evt.target).closest('.popover').length === 0 && tagName !== 'select') {
            hide();
        } else {
            evt.stopImmediatePropagation();
            //evt.stopPropagation();
            return false;
        }
    };

    var scrollHandler = function() {
        angular.element(this).scrollTop(state.scroll.top).scrollLeft(state.scroll.left);
    };

    var show = function() {
        if (eventHandler !== null) {
            EventDispatcher.removeListener(eventHandler);
        }

            var selection = $document[0].getSelection();
            if (selection.baseNode === null) {
                pndPopover.log("Skipping show .. no valid selection");
                return false;
            }
            state.selection = selection;
            EventDispatcher.sendEvent('PndPopover.addTemporarySelection');

        state.popover.show();

   //     if (state.popoverOptions.lockPageScroll) {
            var win = angular.element($window);
            state.scroll.top = win.scrollTop();
            state.scroll.left = win.scrollLeft();
            win.on('scroll', scrollHandler);
      //  }

        $document.on('mouseup', mouseUpHandler);

        return true;
    };

    var startLockShowRemoveTimeout = function() {
        if (state.lockShowRemoveTimeout === null) {
            state.lockShowRemoveTimeout = $timeout(function() {
                state.lockShow = false;
                state.lockShowRemoveTimeout = null;
            }, 200);
        }
    };

    var hide = function() {
        // TODO: REMOVE THIS LINE !!!
        angular.element('.pnd-range-boundary').remove();

        if (eventHandler !== null) {
            EventDispatcher.removeListener(eventHandler);
            eventHandler = null;
        }

        if (typeof state.popoverOptions.hideCallback === 'function') {
            state.popoverOptions.hideCallback();
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

        EventDispatcher.sendEvent('PndPopover.removeTemporarySelection');
    };

    pndPopover.show = function(x, y, options, data) {
        if (state.lockShow) {
            startLockShowRemoveTimeout();
            return false;
        }

        state.lockShow = true;
        startLockShowRemoveTimeout();

        if (state.popover !== null) {
            hide();
        }
        state.popover = initPopover(x, y, options, data);
        var innerPromise = $q.defer();
        var promise = state.popover.$promise;
        promise.then(function () {
            if (show()) {
                calculateSelectionCoordinates(data);
                innerPromise.resolve();
            }
            else {
                innerPromise.reject();
            }
        }, function () {
            // reject popover creation.
            console.log(arguments);
        });
        return innerPromise.promise;
    };

    pndPopover.hide = function() {
        hide();
    };

    pndPopover.setAnchorPosition = function(x, y) {
        state.x = x;
        state.y = y;
        if (state.anchor !== null) {
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