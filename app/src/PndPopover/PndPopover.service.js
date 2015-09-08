angular.module('Pundit2.PndPopover')
.service('PndPopover', function(BaseComponent, $rootScope, $popover, $document, EventDispatcher, $compile) {
    var pndPopover = new BaseComponent('PndPopover');

    var initPopoverOptions = {
        trigger: 'manual',
        container: "[data-ng-app='Pundit2']"
    };

    var state = {
        data: undefined,
        x: 0,
        y: 0,
        popoverOptions: {
        },
        popover: null,
        anchor: null
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
        console.log(evt);
        var tagName = angular.element(evt.target).prop('tagName').toLowerCase();
        console.log(tagName);
        if (angular.element(evt.target).closest('.popover').length === 0 && tagName !== 'select') {
            console.log("faccio l'hide");
            hide();
        }
        else {
            evt.stopImmediatePropagation();
            //evt.stopPropagation();
            console.log("stopImmediatePropagation");
            return false;
        }
    };

    var show = function() {
        state.popover.show();
        $document.on('mouseup', mouseUpHandler);
    };

    var hide = function() {
        $document.off('mouseup', mouseUpHandler);
        if (state.popover === null) {
            return;
        }
        state.popover.hide();
        if (state.popover) {
            state.popover.destroy();
        }
        state.popover = null;
    };

    pndPopover.show = function(x, y, options, data) {
        if (state.popover !== null) {
            hide();
        }
        state.popover = initPopover(x, y, options, data);
        var promise = state.popover.$promise;
        promise.then(function() {
            show();
        });
        return promise;
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
    }

    return pndPopover;
});