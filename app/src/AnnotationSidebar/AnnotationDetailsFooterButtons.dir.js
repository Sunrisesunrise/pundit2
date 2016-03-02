angular.module('Pundit2.AnnotationSidebar')

.directive('annotationDetailsFooterButtons', function(AnnotationDetails, Analytics, AnnotationPopover, Item, MyPundit, EventDispatcher) {
    return {
        restrict: 'C',
        scope: {
            id: '@',
            data: '=',
            options: '='
        },
        templateUrl: 'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html',
        link: function(scope) {

            console.log('inside AnnotationDetails.footerButtons.dir');

            var stopEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
            };
            var checkSocial = function(social) {
                if ((typeof social.counting === 'undefined') || social.counting.comment === '') {
                    social.counting.comment = 0;
                    social.counting.like = 0;
                    social.counting.dislike = 0;
                    social.counting.report = 0;
                    social.counting.endorse = 0;
                    social.status.like = false;
                    social.status.dislike = false;
                    social.status.comment = false;
                    social.status.endorse = false;
                    social.status.report = false;
                    return social;
                }
                if (typeof scope.data.social.counting.comment === 'undefined') {
                    social.counting.comment = scope.data.social.counting[0].comment;
                    social.counting.like = scope.data.social.counting[0].like;
                    social.counting.dislike = scope.data.social.counting[0].dislike;
                    social.counting.report = scope.data.social.counting[0].report;
                    social.counting.endorse = scope.data.social.counting[0].endorse;
                    social.status.like = scope.data.social.status[0].like;
                    social.status.dislike = scope.data.social.status[0].dislike;
                    social.status.comment = scope.data.social.status[0].comment;
                    social.status.endorse = scope.data.social.status[0].endorse;
                    social.status.report = scope.data.social.status[0].report;
                    return social;
                }
                if (typeof social.status.like !== 'boolean') {
                    social.status.like = social.status.like === 'true';
                    social.status.dislike = social.status.dislike === 'true';
                    social.status.comment = social.status.comment === 'true';
                    social.status.endorse = social.status.endorse === 'true';
                    social.status.report = social.status.report === 'true';
                }
                social.counting.like = parseInt(social.counting.like);
                social.counting.dislike = parseInt(social.counting.dislike);
                social.counting.comment = parseInt(social.counting.comment);
                social.counting.endorse = parseInt(social.counting.endorse);
                social.counting.report = parseInt(social.counting.report);

                return social;
            };

            scope.data.social = checkSocial(scope.data.social);



            scope.replyAnnotation = function(event) {

                if (!scope.data.expanded) {
                    //scope.toggleAnnotation();
                    AnnotationDetails.openAnnotationView(scope.id);
                }

                scope.data.scopeReference.replyDialog = !scope.data.scopeReference.replyDialog;
                EventDispatcher.sendEvent('AnnotationDetails.openBox', true);
                stopEvent(event);
            };

            scope.saveEdit = function(event) {
                var promise = AnnotationDetails.saveEditedComment(scope.data.id, scope.data.annotation.itemsArray[0], scope.data.annotation.comment);

                promise.then(function() {
                    scope.data.scopeReference.replyDialog = false;
                }, function() {});

                stopEvent(event);
            };

            scope.socialEvent = function(event, type) {
                var createItemFromResource = function(event) {
                    var values = {};
                    values.uri = 'lool';
                    values.icon = true;
                    values.elem = event.currentTarget;

                    return new Item(values.uri, values);
                };
                var contrary = {
                        like: 'dislike',
                        dislike: 'like',
                        endorse: 'report',
                        report: 'endorse'
                    },
                    promise = {},
                    operation = '';

                if (!MyPundit.isUserLogged()) {
                    angular.element(event.target).addClass('pnd-range-pos-icon');
                    AnnotationPopover.show(event.clientX, event.clientY, createItemFromResource(event), '', undefined, 'alert');
                    EventDispatcher.sendEvent('openContextualMenu');
                    return;
                }

                if (typeof type === 'undefined') {
                    return;
                }
                if (type === 'comment') {
                    promise = AnnotationDetails.socialEvent(scope.data.id, scope.data.parentId, type, 'add', scope.annotation.replyCommentValue);
                } else {


                    if ((scope.data.social.status[type])) {
                        scope.data.social.counting[type] = parseInt(scope.data.social.counting[type]) - 1;
                        scope.data.social.status[type] = false;
                        operation = 'remove';


                    } else if (!scope.data.social.status[type] && !scope.data.social.status[contrary[type]]) {
                        scope.data.social.counting[type] = parseInt(scope.data.social.counting[type]) + 1;
                        scope.data.social.status[type] = true;
                        operation = 'add';
                    } else if (!scope.data.social.status[type] && scope.data.social.status[contrary[type]]) {
                        scope.data.social.status[contrary[type]] = false;
                        scope.data.social.counting[type] = parseInt(scope.data.social.counting[type]) + 1;
                        scope.data.social.counting[contrary[type]] = parseInt(scope.data.social.counting[contrary[type]]) - 1;
                        scope.data.social.status[type] = true;
                        operation = 'add';
                    }


                    promise = AnnotationDetails.socialEvent(scope.data.id, scope.data.parentId, type, operation);

                    promise.then(function(status) {

                        if (status) {
                            console.log('socialEvent:OK');

                        } else {
                            EventDispatcher.sendEvent('Pundit.alert', {
                                title: 'Broken social ' + type,
                                id: "WARNING",
                                timeout: 12000,
                                message: "It looks like some annotations on the page are broken: this can happen if the <strong>text of the page has changed in the last days</strong>.<br /><br />See if you can fix the broken annotations by editing them.<br /><br />Broken annotations are shown on the top right of the sidebar and are highlighted in red.<br /><a href=\"javascript:void(0)\" data-inner-callback=\"0\">Click here</a> to open first broken annotation",
                                callbacks: [

                                ]
                            });
                        }
                    });
                }


                stopEvent(event);
            };
        }
    };
});