angular.module('Pundit2.Breadcrumbs')
.directive('breadcrumbs', function(Breadcrumbs) {
    return {
        restrict: 'E',
        scope: {
            name: '=bcName',
            emptyPlaceholder: '=emptyPlaceholder',
            firstItemPrefix: '=firstItemPrefix'
        },
        templateUrl: 'src/Breadcrumbs/Breadcrumbs.dir.tmpl.html',
        controller: 'BreadcrumbsCtrl',
        link: function (scope, element, attr, transclusion) {
            element.on('$destroy', function() {
                Breadcrumbs.remove(scope.name);
            });
        }
    };
});