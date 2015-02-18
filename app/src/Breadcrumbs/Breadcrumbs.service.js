angular.module('Pundit2.Breadcrumbs')
.service('Breadcrumbs', function(BaseComponent) {
    var breadcrumbs = new BaseComponent('Breadcrumbs');

    var state = {};

    breadcrumbs.add = function(name, items) {
        if (typeof items === 'undefined') {
            items = [];
        }
        if (typeof state[name] === 'undefined') {
            state[name] = {
                items: []
            };
        }

        state[name].items = items;
    }

    breadcrumbs.remove = function (name) {
        if (typeof state[name] !== 'undefined') {
            delete state[name];
        }
    }

    breadcrumbs.itemSelect = function(name, index) {
        if (typeof state[name] !== 'undefined') {
            var item = state[name].items[index];
            if (typeof item !== 'undefined' &&
                item.hasOwnProperty('callback') &&
                typeof item.callback === 'function') {
                item.callback.call(null, index, item);
                breadcrumbs.dropItemsFromIndex(name, index + 1);
            }
        }
    }

    breadcrumbs.getItems = function(name) {
        if (typeof state[name] !== 'undefined') {
            return state[name].items;
        }
        return [];
    }

    breadcrumbs.appendItem = function(name, itemObject) {
        if (typeof state[name] !== 'undefined') {
            state[name].items.push(itemObject);
        }
    }

    breadcrumbs.popItem = function(name) {
        if (typeof state[name] !== 'undefined') {
            state[name].items.pop();
        }
    }

    breadcrumbs.dropItemsFromIndex = function(name, index) {
        if (typeof state[name] !== 'undefined') {
            if (index >= state[name].items.length) {
                return;
            }
            index = index < 0 ? 0 : index;
            state[name].items.splice(index, state[name].items.length - index);
        }
    }

    return breadcrumbs;
});