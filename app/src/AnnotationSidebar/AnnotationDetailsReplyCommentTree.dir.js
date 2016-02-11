angular.module('Pundit2.AnnotationSidebar')

    .directive('annotationDetailsReplyCommentTree', function(AnnotationDetails, Analytics) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                data: '=',
                options: '='
            },
            templateUrl: 'src/AnnotationSidebar/AnnotationDetails.replyCommentTree.dir.tmpl.html',
            // require: '^annotationSidebar',
            link: function(scope, element, attrs) {
                scope.reply = scope.options.reply;
                scope.replyDialog = false;
                scope.like = scope.options.like;
                scope.dislike = scope.options.dislike;
                scope.endorse = scope.options.endorse;
                scope.report = scope.options.report;
                var stopEvent = function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                };
                scope.editMode = false;
                scope.replyDialog = true;
               // console.log("inside directive "+AnnotationsExchange.getAnnotationById(scope.id).item);
                scope.replyAnnotation = function (event) {
                    scope.replyDialog = !scope.replyDialog;

                    stopEvent(event);
                }
                scope.saveEdit = function (event) {
                    var promise = AnnotationDetails.saveEditedComment(scope.id, scope.annotation.itemsArray[0], scope.annotation.comment);

                    promise.then(function () {
                        scope.replyDialog = false;
                    }, function () {
                    });

                    stopEvent(event);
                };
                scope.deleteAnnotationLeaf = function (event) {
                    AnnotationDetails.openConfirmModal(element, scope.id);
                    Analytics.track('buttons', 'click', 'annotation--details--delete');

                    stopEvent(event);
                };

            }
        };
    });