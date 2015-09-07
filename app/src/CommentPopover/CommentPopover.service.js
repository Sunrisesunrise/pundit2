angular.module('Pundit2.CommentPopover')
.service('CommentPopover', function(BaseComponent, EventDispatcher) {

    console.log("CommentPopover.init");

    var commentPopover = new BaseComponent('CommentPopover');

    var state = {};


    EventDispatcher.addListener('CommentPopover.show', function(evt){
        var eventData = evt.args;
        console.log("CommentPopover.show", eventData);
    });


    return commentPopover;
});