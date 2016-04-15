angular.module('Pundit2.AnnotationSidebar')

.directive('annotationDetails', function(AnnotationDetails) {
    return {
        restrict: 'E',
        scope: {
            id: '@',
            motivation: '@motivation',
            broken: '=broken'
        },
        templateUrl: 'src/AnnotationSidebar/AnnotationDetails.dir.tmpl.html',
        controller: 'AnnotationDetailsCtrl',
        // require: '^annotationSidebar',
        link: function(scope, element) {
            element.mouseenter(
                function() {
                    AnnotationDetails.activateTextFragmentHighlight(scope.annotation.broken, scope.id, scope.annotation.itemsUriArray);
                    scope.$digest();
                }
            );
            element.mouseleave(
                function() {
                    AnnotationDetails.resetTextFragmentHighlight(scope.annotation.broken);
                    scope.$digest();
                }
            );
        }
    };
});