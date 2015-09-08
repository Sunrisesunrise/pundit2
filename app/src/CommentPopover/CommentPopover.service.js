angular.module('Pundit2.CommentPopover')
.service('CommentPopover', function(BaseComponent, $rootScope, $popover, $document, EventDispatcher, $compile, PndPopover) {
    var commentPopover = new BaseComponent('CommentPopover');

    /*
    var state = {
        popover: null,
        popoverOptions: {
            // scope needed to instantiate a new popover using $popover provider
            scope: $rootScope.$new(),
            trigger: 'manual',
            container: "[data-ng-app='Pundit2']"
        },
        anchor: null
    };

    var elem;

    var initPopover = function(data) {

        state.popoverOptions.scope.arrowLeft = '0px';
        state.popoverOptions.templateUrl = 'src/CommentPopover/CommentPopover.tmpl.html';
        state.popoverOptions.controller = 'CommentPopoverCtrl';
        //state.popoverOptions.html = true;
        //state.popoverOptions.content = '<comment-popover></comment-popover>';

        state.popoverOptions.scope.literalText = 'test init content';

        if (state.anchor === null)  {
            // create div anchor (the element bound with angular strap menu reference)
            state.anchor = angular.element("<div class='pnd-commentpopover-anchor' style='position: absolute; left: 0px; top: 0px;'><div>");
            angular.element("[data-ng-app='Pundit2']")
            .prepend(state.anchor);
        }

        state.anchor.css({
            left: data.x,
            top: data.y
        });

        state.popover = $popover(state.anchor, state.popoverOptions);
        return state.popover;
    };

    var show = function() {
        state.popover.show();
        $document.on('mousedown', mouseUpHandler);
    };

    var hide = function() {
        if (state.popover === null) {
            return;
        }
        state.popover.hide();
        if (state.popover) {
            state.popover.destroy();
        }
        state.popover = null;
        $document.off('mouseup', mouseUpHandler);
    };

    var mouseUpHandler = function(evt) {
        if (angular.element(evt.target).closest('.pnd-comment-popover').length === 0) {
            hide();
        }
    };

    var showPopover = function(data) {
        if (state.popover === null) {
            state.popover = initPopover(data);
            state.popover.$promise.then(function() {
                $compile(angular.element('comment-popover'))(state.popoverOptions.scope);
                show();
            });
        }
    };
     EventDispatcher.addListener('CommentPopover.show', function(evt){
     showPopover({
     x: evt.args.mouseX,
     y: evt.args.mouseY,
     item: evt.args.item
     });
     });
    */


    commentPopover.show = function(x, y, item) {
        var options = {
            templateUrl: 'src/CommentPopover/CommentPopover.tmpl.html',
            controller: 'CommentPopoverCtrl'
        };
        var promise = PndPopover.show(x, y, options, item);
        promise.then(function() {
            console.log("commentPopover.show promise resolved");
        });
        return promise;
    };

    return commentPopover;
});