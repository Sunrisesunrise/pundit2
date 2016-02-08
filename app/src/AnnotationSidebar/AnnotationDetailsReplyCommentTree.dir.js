angular.module('Pundit2.AnnotationSidebar')

    .directive('annotationDetailsReplyCommentTree', function(AnnotationDetails, Analytics, AnnotationsExchange) {
        return {
            restrict: 'E',
            scope: {
                id: '@'


            },
            templateUrl: 'src/AnnotationSidebar/AnnotationDetails.replyCommentTree.dir.tmpl.html',
            controller: 'AnnotationDetailsCtrl',
            // require: '^annotationSidebar',
            link: function(scope, element, attrs) {
                var stopEvent = function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                };
                scope.editMode = false;
                scope.replyDialog = true;
                console.log("inside directive "+AnnotationsExchange.getAnnotationById(scope.id).item);
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