angular.module('Pundit2.AnnotationSidebar')

.directive('annotationDetailsSocialButtons', function(AnnotationDetails, Analytics, AnnotationPopover, Item, MyPundit, EventDispatcher, $window) {
    return {
        restrict: 'C',
        scope: {
            id: '@',
            data: '=',
            options: '='
        },
        templateUrl: 'src/AnnotationSidebar/AnnotationDetailsSocialButtons.tmpl.html',
        link: function(scope) {

            var stopEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
            };

            var createItemFromResource = function(event) {
                var values = {};
                values.uri = 'lool';
                values.icon = true;
                values.elem = event.currentTarget;

                return new Item(values.uri, values);
            };


            scope.disabled = {
                'like': false,
                'dislike': false,
                'comment': false,
                'endorse': false,
                'report': false
            };

            scope.replyAnnotation = function(event) {
                var scopeRef = AnnotationDetails.getScopeReference(scope.id),
                    screen = angular.element(window),
                    iconReference = angular.element(event.target);

                if (event.target.className === 'pnd-icon-comment') {
                    iconReference = angular.element(event.target.parentElement);
                }
                scope.data.replyDialog = !scope.data.replyDialog;

                if (typeof scope.data.repliesLoaded === 'undefined') {
                    scope.data.repliesLoaded = false;
                }

                if (!MyPundit.isUserLogged()) {
                    iconReference.classList += ' pnd-range-pos-icon';
                    scope.data.repliesLoaded = true;
                    scope.data.replyDialog = false;
                    AnnotationPopover.show(event.clientX, event.clientY, createItemFromResource(event), '', undefined, 'alert', iconReference);
                    EventDispatcher.sendEvent('openContextualMenu');
                    return;
                }

                if (!scope.data.expanded) {
                    AnnotationDetails.openAnnotationView(scope.id, true);
                    scope.data.replyDialog = true;
                }

                if (typeof scopeRef.replyTree === 'undefined') {
                    scopeRef.replyTree = [];
                }

                //if (scopeRef.replyTree.length === 0) {
                //    AnnotationDetails.getRepliesByAnnotationId(scope.id).then(function(data) {
                //        scopeRef.replyTree = AnnotationDetails.addRepliesReference(scope.data.parentId, data);
                //        AnnotationDetails.getScopeReference(scope.id).annotation.repliesLoaded = true;
                //    });
                //}

                if (scope.data.replyDialog === true ) {
                    setTimeout(function() {
                        var element = angular.element('.pnd-annotation-reply-textarea')[0].getBoundingClientRect();
                        var parentElement = angular.element('.pnd-annotation-expanded')[0];
                        var parentElementOffset = parentElement.getBoundingClientRect();

                        if (element.height + element.top  > screen.height()) {
                            if (parentElementOffset.height < screen.height()) {
                                angular.element('html,body').animate({
                                        scrollTop: ($window.scrollY + (element.top % screen.height()) + element.height + 40) % screen.height()
                                    },
                                    'slow');
                            } else {

                                angular.element('html,body').animate({
                                        //scrollTop: $window.scrollY + element.top - element.height * 2 + 23
                                        scrollTop: $window.scrollY + (element.top % screen.height()) + element.height + 40
                                    },
                                    'slow');
                            }
                        }
                        setTimeout(function() {
                            angular.element('div[class*="pnd-annotation-reply-textarea"]>textarea')[0].focus();
                        }, 700);

                    }, 800);
                }
                stopEvent(event);
            };

            scope.saveEdit = function(event) {
                var promise = AnnotationDetails.saveEditedComment(scope.data.id, scope.data.itemsArray[0], scope.data.comment);

                promise.then(function() {
                    scope.data.scopeReference.replyDialog = false;
                }, function() {});

                stopEvent(event);
            };

            scope.socialEvent = function(event, type) {
                var contrary = {
                        like: 'dislike',
                        dislike: 'like',
                        endorse: 'report',
                        report: 'endorse'
                    },
                    promise = {},
                    operation = '',
                    iconReference = angular.element(event.target);

                if (!MyPundit.isUserLogged()) {
                    iconReference.addClass('pnd-range-pos-icon');
                    AnnotationPopover.show(event.clientX, event.clientY, createItemFromResource(event), '', undefined, 'alert', iconReference);
                    EventDispatcher.sendEvent('openContextualMenu');
                    return;
                }

                if (typeof type === 'undefined') {
                    return;
                }
                if (type === 'comment') {
                    promise = AnnotationDetails.socialEvent(scope.data.id, scope.data.parentId, type, 'add', scope.data.replyCommentValue);
                } else {

                    if (!scope.disabled[type]) {

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

                        scope.disabled[type] = true;

                        promise.then(function(status) {

                            if (status === false) {
                                EventDispatcher.sendEvent('Pundit.alert', {
                                    title: 'Broken reply ' + type,
                                    id: "WARNING",
                                    timeout: 12000,
                                    message: "It looks like some annotations on the page are broken: this can happen if the <strong>text of the page has changed in the last days</strong>.<br /><br />See if you can fix the broken annotations by editing them.<br /><br />Broken annotations are shown on the top right of the sidebar and are highlighted in red.<br /><a href=\"javascript:void(0)\" data-inner-callback=\"0\">Click here</a> to open first broken annotation",
                                    callbacks: [

                                    ]
                                });

                            }
                            // else {
                            //     console.log('socialEvent:OK');
                            // }
                            scope.disabled[type] = false;
                        });
                    }

                }

                stopEvent(event);
            };
        }
    };
});