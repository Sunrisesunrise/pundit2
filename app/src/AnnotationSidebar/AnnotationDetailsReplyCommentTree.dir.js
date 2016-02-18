angular.module('Pundit2.AnnotationSidebar')

    .directive('annotationDetailsReplyCommentTree', function(AnnotationDetails, Analytics, EventDispatcher) {
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

                scope.likeAnnotation = function (event) {
                    var promise ={};

                    if(!scope.social.status.like) {

                        promise = AnnotationDetails.like(scope.id, 'add');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.dislike){
                                    scope.social.status.dislike = !scope.social.status.dislike;
                                    scope.social.counting.dislike = parseInt(scope.social.counting.dislike) - 1;
                                }

                                scope.social.counting.like = parseInt(scope.social.counting.like) + 1;
                            }
                        });
                    }else{
                        promise = AnnotationDetails.like(scope.id, 'remove');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.dislike){
                                    scope.social.status.dislike = !scope.social.status.dislike;
                                    scope.social.counting.dislike = parseInt(scope.social.counting.dislike) - 1;
                                }

                                scope.social.counting.like = parseInt(scope.social.counting.like) - 1;
                            }
                        });

                    }
                    scope.social.status.like = !scope.social.status.like;
                    stopEvent(event);
                };

                scope.dislikeAnnotation = function () {
                    var promise ={};

                    if(!scope.social.status.dislike) {

                        promise = AnnotationDetails.dislike(scope.id, 'add');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.like){
                                    scope.social.status.like = scope.social.status.like;
                                    scope.social.counting.like = parseInt(scope.social.counting.like) - 1;
                                }

                                scope.social.counting.dislike = parseInt(scope.social.counting.dislike) + 1;
                            }
                        });
                    }else{
                        promise = AnnotationDetails.dislike(scope.id, 'remove');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.like){
                                    scope.social.status.like = !scope.social.status.like;
                                    scope.social.counting.like = parseInt(scope.social.counting.like) - 1;
                                }

                                scope.social.counting.dislike = parseInt(scope.social.counting.dislike) - 1;
                            }
                        });

                    }
                    scope.social.status.dislike = !scope.social.status.dislike;
                    stopEvent(event);
                };

                scope.reportAnnotation = function () {
                    var promise ={};

                    if(!scope.social.status.report) {

                        promise = AnnotationDetails.report(scope.id, 'add');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.endors){
                                    scope.social.status.endors = !scope.social.status.endors;
                                    scope.social.counting.endors = parseInt(scope.social.counting.endors) - 1;
                                }

                                scope.social.counting.report = parseInt(scope.social.counting.report) + 1;
                            }
                        });
                    }else{
                        promise = AnnotationDetails.report(scope.id, 'remove');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.endors){
                                    scope.social.status.endors = !scope.social.status.endors;
                                    scope.social.counting.endors = parseInt(scope.social.counting.endors) - 1;
                                }

                                scope.social.counting.report = parseInt(scope.social.counting.report) - 1;
                            }
                        });

                    }
                    scope.social.status.report = !scope.social.status.report;
                    stopEvent(event);
                };

                scope.endorseAnnotation = function () {
                    var promise ={};

                    if(!scope.social.status.endors) {

                        promise = AnnotationDetails.endors(scope.id, 'add');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.report){
                                    scope.social.status.report = !scope.social.status.report;
                                    scope.social.counting.report = parseInt(scope.social.counting.report) - 1;
                                }

                                scope.social.counting.endors = parseInt(scope.social.counting.endors) + 1;
                            }
                        });
                    }else{
                        promise = AnnotationDetails.endors(scope.id, 'remove');

                        promise.then(function (status) {
                            if(status) {

                                if(scope.social.status.report){
                                    scope.social.status.report = !scope.social.status.report;
                                    scope.social.counting.report = parseInt(scope.social.counting.report) - 1;
                                }

                                scope.social.counting.endors = parseInt(scope.social.counting.endors) - 1;
                            }
                        });

                    }
                    scope.social.status.endors = !scope.social.status.endors;
                    stopEvent(event);
                };
            }
        };
    });