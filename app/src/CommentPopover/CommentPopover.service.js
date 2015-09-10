angular.module('Pundit2.CommentPopover')
.service('CommentPopover', function(BaseComponent, PndPopover) {
    var commentPopover = new BaseComponent('CommentPopover');

    commentPopover.lastUsedNotebookID = undefined;

    commentPopover.show = function(x, y, item) {
        var options = {
            templateUrl: 'src/CommentPopover/CommentPopover.tmpl.html',
            controller: 'CommentPopoverCtrl'
        };
        var promise = PndPopover.show(x, y, options, item);
        promise.then(function() {
            console.log("commentPopover.show promise resolved");
        }, function() {
            console.log("reject commentPopover.show");
            console.log(arguments);
        });
        return promise;
    };

    return commentPopover;
});