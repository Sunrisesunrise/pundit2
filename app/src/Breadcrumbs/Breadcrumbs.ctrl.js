angular.module('Pundit2.Breadcrumbs')
.controller('BreadcrumbsCtrl', function($scope, Breadcrumbs) {
    $scope.items = [];

    if (typeof $scope.name === 'undefined') {
        $scope.name = "breadcrumb-" + Math.floor((new Date()).getTime() / 100 * (Math.random() * 100) + 1);
    }

    $scope.itemSelect = function(index, event) {
        event.preventDefault();
        Breadcrumbs.itemSelect($scope.name, index);
        return false;
    }

    $scope.getItems = function() {
        return Breadcrumbs.getItems($scope.name);
    }

    $scope.appendItem = function(itemObject) {
        Breadcrumbs.appendItem($scope.name, itemObject);
    }

    $scope.popItem = function() {
        Breadcrumbs.popItem($scope.name);
    }

    $scope.dropItemsFromIndex = function(index) {
        Breadcrumbs.popItem($scope.name, index);
    }

    // Handle add and remove instance.
    Breadcrumbs.add($scope.name);

    $scope.$on('$destroy', function() {
        Breadcrumbs.remove($scope.name);
    })
});
