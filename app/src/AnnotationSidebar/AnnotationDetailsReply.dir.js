/*global moment*/
angular.module('Pundit2.AnnotationSidebar')

.directive('annotationDetailsReply', function(AnnotationDetails, Analytics, timeAgo) {
    return {
        restrict: 'E',
        scope: {
            id: '@',
            data: '=',
            options: '='
        },
        templateUrl: 'src/AnnotationSidebar/AnnotationDetailsReply.dir.tmpl.html',
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

            var oneDay = 60 * 60 * 24;
            timeAgo.settings.fullDateAfterSeconds = oneDay;

            var stopEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
            };
            scope.editMode = false;
            scope.replyDialog = true;
            scope.social = scope.data.social;
            scope.data.defaultThumb = false;
            scope.data.edited = false;

            if (scope.data.modified !== '' && typeof scope.data.modified !== 'undefined') {
                scope.data.edited = true;
            }

            if (scope.data.thumbnail === '' || (typeof scope.data.thumbnail === 'undefined')) {
                scope.data.defaultThumb = true;
            }

            if (scope.data.creatorName === '' || (typeof scope.data.creatorName === 'undefined')) {
                scope.data.creatorName = scope.userData.fullName;
            }
            // console.log("inside directive "+AnnotationsExchange.getAnnotationById(scope.id).item);


            scope.replyAnnotation = function(event) {
                scope.replyDialog = !scope.replyDialog;

                stopEvent(event);
            };

            scope.isUserToolShowed = function() {
                return AnnotationDetails.isUserToolShowed(scope.data.creator);
            };
            scope.menuEdit = function(evt) {
                AnnotationDetails.menuEdit(evt.toElement, scope, 'left');
                console.log("inside menu");
            };

            scope.cancelEdit = function(event) {
                scope.editMode = false;
                stopEvent(event);
            };


            scope.saveEdit = function(event) {

                var promise = AnnotationDetails.socialEvent(scope.data.id, scope.data.parentId, 'editComment', 'add', scope.data.content);

                promise.then(function() {
                    scope.editMode = false;
                    scope.data.modified =  moment();
                    scope.data.edited = true;
                    AnnotationDetails.closeEditReply();
                }, function() {});

                stopEvent(event);
            };

            scope.editComment = function(event) {
                scope.editMode = true;
                scope.editCommentValue = scope.data.content;
                scope.replyDialog = true;

                stopEvent(event);
            };

            var hideReply = function() {
                var scopeRef = AnnotationDetails.getScopeReference(scope.options.parentAnnotation.id);

                AnnotationDetails.removeRepliesReference(scope.options.parentAnnotation.id, scope.id);
                scopeRef.replyTree = AnnotationDetails.getRepliesReference(scope.options.parentAnnotation.id);

                scopeRef.annotation.social.counting.comment = scopeRef.annotation.social.counting.comment - 1;
                scopeRef.annotation.social.status.comment = AnnotationDetails.checkCreatorRepliesReference(scope.options.parentAnnotation.id, scope.userData.uri);
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