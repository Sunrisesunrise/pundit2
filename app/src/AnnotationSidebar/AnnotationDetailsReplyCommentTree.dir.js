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
            scope.reply = false;
            scope.replyDialog = false;
            scope.like = scope.options.like;
            scope.dislike = scope.options.dislike;
            scope.endorse = scope.options.endorse;
            scope.report = scope.options.report;
            scope.annotation = AnnotationDetails.getAnnotationDetails(scope.id);
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

            scope.saveEdit = function(event) {
                var promise = AnnotationDetails.saveEditedComment(scope.id, scope.annotation.itemsArray[0], scope.editCommentValue);

                promise.then(function() {
                    scope.replyDialog = !scope.replyDialog;
                }, function() {});

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

            scope.deleteAnnotationLeaf = function(event) {
                AnnotationDetails.openConfirmModal(element, scope.id);
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