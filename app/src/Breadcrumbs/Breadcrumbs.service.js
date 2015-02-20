angular.module('Pundit2.Breadcrumbs')
.service('Breadcrumbs', function(BaseComponent) {
    var breadcrumbs = new BaseComponent('Breadcrumbs');

    var state = {};

    var canChangeItemProperty = function(name, index) {
        if (index < 0) { return false; }
        if (typeof state[name] === 'undefined') { return false; }
        if (index >= state[name].items.length) { return false; }
        return true;
    };

    var setItemLabel = function(itemObject, label) {
        if (typeof label === 'undefined') {
            label = itemObject.label;
        }
        var newLabel = label;
        if (typeof itemObject['charLimit'] === 'number') {
            var charLimit = itemObject.charLimit;
            charLimit = charLimit < 4 ? 4 : charLimit;
            if (newLabel.length > charLimit) {
                newLabel = newLabel.substr(0, charLimit - 2) + '...';
            }
        }
        itemObject.originalLabel = label;
        itemObject.label = newLabel;
    };

    breadcrumbs.visible = function(name, value) {
        if (typeof state[name] !== 'undefined') {
            if (typeof value === 'boolean') {
                state[name].visible = value;
            }
            return state[name].visible;
        }
        return false;
    }

    breadcrumbs.add = function(name, items) {
        if (typeof items === 'undefined') {
            items = [];
        }
        if (typeof state[name] === 'undefined') {
            state[name] = {
                visible: true,
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

    breadcrumbs.getItem = function(name, index) {
        index = index < 0 ? 0 : index;
        if (typeof state[name] !== 'undefined' && index < state[name].items.length) {
            return state[name].items[index];
        }
        return null;
    }

    breadcrumbs.appendItem = function(name, itemObject) {
        if (typeof state[name] !== 'undefined') {
            setItemLabel(itemObject, itemObject.label);
            state[name].items.push(itemObject);
        }
    }

    breadcrumbs.popItem = function(name) {
        if (typeof state[name] !== 'undefined') {
            state[name].items.pop();
        }
    }

    breadcrumbs.setItemLabel = function(name, index, label) {
        if (!canChangeItemProperty(name, index)) {
            return;
        }
        setItemLabel(state[name].items[index], label);
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