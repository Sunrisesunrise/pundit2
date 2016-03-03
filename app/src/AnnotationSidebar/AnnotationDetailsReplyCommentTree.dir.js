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
        link: function(scope, element) {
            scope.leaf = true;
            scope.reply = false;
            scope.replyDialog = false;
            scope.like = scope.options.like;
            scope.dislike = scope.options.dislike;
            scope.endorse = scope.options.endorse;
            scope.report = scope.options.report;
            scope.data.showReply = true;
            //angular.extend(scope.annotation, scope.data.annotation);

            var stopEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
            };
            scope.editMode = false;
            scope.replyDialog = true;
            scope.social = scope.data.social;
            // console.log("inside directive "+AnnotationsExchange.getAnnotationById(scope.id).item);


            scope.replyAnnotation = function(event) {
                scope.replyDialog = !scope.replyDialog;

                stopEvent(event);
            };

            scope.isUserToolShowed = function() {
                return AnnotationDetails.isUserToolShowed(scope.data.creator);
            };
            scope.menuEdit = function(evt) {
                AnnotationDetails.menuEdit(evt.toElement, scope);
                console.log("inside menu");
            };

            scope.editComment = function(event) {
                scope.editMode = !scope.editMode;
                scope.editCommentValue = scope.data.content;

                stopEvent(event);
            };

            var hideReply = function() {
                //scope.data.showReply = false;
                for (var i = 0, len = scope.options.replyTreeArray.length; i < len; i++) {
                    if (scope.options.replyTreeArray[i].id === scope.id) {
                        scope.options.replyTreeArray.splice(i, 1);
                        break;
                    }
                }
                scope.options.parentAnnotation.social.counting.comment = scope.options.parentAnnotation.social.counting.comment - 1;
                if (scope.options.parentAnnotation.social.counting.comment == 0) {
                    scope.options.parentAnnotation.social.status.comment = false;
                }
            };


            scope.deleteAnnotationLeaf = function(event) {
                AnnotationDetails.openConfirmModalReply(element, scope.id, hideReply);
                Analytics.track('buttons', 'click', 'annotation--details--delete');
                stopEvent(event);
            };

            //$scope.editComment = function(event) {
            //    $scope.editMode = !$scope.editMode;
            //    $scope.editCommentValue = $scope.annotation.comment;
            //
            //    stopEvent(event);
            //};

        }
    };
});