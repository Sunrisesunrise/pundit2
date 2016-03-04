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
            scope.userData = AnnotationDetails.userData();
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
                var scopeRef = AnnotationDetails.getScopeReference(scope.options.parentAnnotation.id);
                AnnotationDetails.removeRepliesReference(scope.id);
                scopeRef.replyTree = AnnotationDetails.getRepliesReference(scope.id);


                scopeRef.annotation.social.counting.comment = scopeRef.annotation.social.counting.comment - 1;
                scopeRef.annotation.social.status.comment = AnnotationDetails.checkCreatorRepliesReference(scope.userData.uri);
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