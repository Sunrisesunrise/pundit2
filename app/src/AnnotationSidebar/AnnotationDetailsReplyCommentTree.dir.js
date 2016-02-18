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
            link: function(scope, element ) {
                scope.reply = false;
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
                scope.social = scope.data.social;
               // console.log("inside directive "+AnnotationsExchange.getAnnotationById(scope.id).item);

                scope.replyAnnotation = function (event) {
                    scope.replyDialog = !scope.replyDialog;

                    stopEvent(event);
                };

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

                scope.socialEvent = function (event, type) {
                    var contrary = {
                        like : 'dislike',
                        dislike : 'like',
                        endors : 'report',
                        report : 'endors'
                        },
                    promise ={},
                    operation = '';

                    if(typeof type === 'undefined'){
                        return;
                    }
                    if(!scope.social.status[type]){
                        operation = 'add';
                    }else {
                        operation = 'remove';
                    }
                    if(!scope.social.status[type]) {

                        promise = AnnotationDetails.socialEvent(scope.id, type, operation);

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status[contrary[type]]){
                                    scope.social.status[contrary[type]] = !scope.social.status[contrary[type]];
                                    scope.social.counting[contrary[type]] = parseInt(scope.social.counting[contrary[type]]) - 1;
                                }

                                scope.social.counting[type] = parseInt(scope.social.counting[type]) + 1;
                            }
                        });
                    }
                    scope.social.status[type] = !scope.social.status[type];
                    stopEvent(event);
                };
            }
        };
    });