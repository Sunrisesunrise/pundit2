angular.module('Pundit2.Breadcrumbs')
.controller('BreadcrumbsCtrl', function($scope, Breadcrumbs) {
    $scope.items = [];

    if (typeof $scope.name === 'undefined') {
        $scope.name = "breadcrumb-" + Math.floor((new Date()).getTime() / 100 * (Math.random() * 100) + 1);
    }

    $scope.isPlaceholderVisible = function() {
        var items = Breadcrumbs.getItems($scope.name);
        if (items.length === 0) {
            return true;
        }
        if (items[0].label.length === 0) {
            return true;
        }
        return false;
    };

    $scope.getFirstItemPrefix = function() {
        return Breadcrumbs.get($scope.name).firstItemPrefix;
    };

    $scope.isVisible = function() {
        return Breadcrumbs.visible($scope.name);
    };

    $scope.itemSelect = function(index, event) {
        event.preventDefault();
        Breadcrumbs.itemSelect($scope.name, index);
        return false;
    };

    $scope.getItems = function() {
        return Breadcrumbs.getItems($scope.name);
    };

    $scope.appendItem = function(itemObject) {
        Breadcrumbs.appendItem($scope.name, itemObject);
    };

    $scope.popItem = function() {
        Breadcrumbs.popItem($scope.name);
    };

    $scope.dropItemsFromIndex = function(index) {
        Breadcrumbs.popItem($scope.name, index);
    };

    // Handle add and remove instance.
    Breadcrumbs.add($scope.name, {
        firstItemPrefix: $scope.firstItemPrefix
    });

    $scope.$on('$destroy', function() {
        Breadcrumbs.remove($scope.name);
    });
});
