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

                    if (!scope.data.social.status[type]) {
                        operation = 'add';
                    } else {
                        operation = 'remove';
                    }

                    promise = AnnotationDetails.socialEvent(scope.data.id, scope.data.parentId, type, operation);

                    promise.then(function(status) {

                        if (status) {

                            if (scope.data.social.status[type] && !scope.data.social.status[contrary[type]]) {
                                scope.data.social.counting[type] = parseInt(scope.data.social.counting[type]) - 1;
                            }

                            if (!scope.data.social.status[type] && !scope.data.social.status[contrary[type]]) {
                                scope.data.social.counting[type] = parseInt(scope.data.social.counting[type]) + 1;
                            }

                            if (!scope.data.social.status[type] && scope.data.social.status[contrary[type]]) {
                                scope.data.social.status[contrary[type]] = !scope.data.social.status[contrary[type]];
                                scope.data.social.counting[type] = parseInt(scope.data.social.counting[type]) + 1;
                                scope.data.social.counting[contrary[type]] = parseInt(scope.data.social.counting[contrary[type]]) - 1;
                            }

                            scope.data.social.status[type] = !scope.data.social.status[type];
                        }
                    });
                }


                stopEvent(event);
            };
        }
    };
});