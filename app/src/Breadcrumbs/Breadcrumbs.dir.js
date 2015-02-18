angular.module('Pundit2.Breadcrumbs')
.directive('breadcrumbs', function() {
    return {
        restrict: 'E',
        scope: {
            emptyPlaceholder: '=emptyPlaceholder'
        },
        templateUrl: 'src/Breadcrumbs/Breadcrumbs.dir.tmpl.html',
        controller: 'BreadcrumbsCtrl'
    };
});