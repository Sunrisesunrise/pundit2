angular.module('Pundit2.Breadcrumbs')
.service('Breadcrumbs', function(BaseComponent) {
    var breadcrumbs = new BaseComponent('Breadcrumbs');

    breadcrumbs.get = function(id) {
        var element = angular.element(document.querySelector(id));
        if (element.length > 0) {
            return element.isolateScope();
        }
        return null;
    }

    breadcrumbs.appendItem = function(id, itemObject) {
        var elementScope = breadcrumbs.get(id);
        if (elementScope) {
            elementScope.appendItem(itemObject);
        }
    }

    breadcrumbs.popItem = function(id) {
        var elementScope = breadcrumbs.get(id);
        if (elementScope) {
            elementScope.popItem();
        }
    }

    breadcrumbs.dropItemsFromIndex = function(id, index) {
        var elementScope = breadcrumbs.get(id);
        if (elementScope) {
            elementScope.dropItemsFromIndex(index);
        }
    }

    return breadcrumbs;
});