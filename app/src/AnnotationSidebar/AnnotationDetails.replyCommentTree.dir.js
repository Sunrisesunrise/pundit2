angular.module('Pundit2.AnnotationSidebar')

    .directive('annotationDetails.replyCommentTree', function(AnnotationDetails) {
        return {
            restrict: 'E',
            scope: {
                editMode: false,
                replyDialog: false
            },
            templateUrl: 'src/AnnotationSidebar/AnnotationDetails.replyCommentTree.dir.tmpl.html',
            controller: 'AnnotationDetailsCtrl',
            // require: '^annotationSidebar',
            link: function(scope, element) {


            }
        };
    });