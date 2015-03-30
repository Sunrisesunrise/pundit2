angular.module('Pundit2.Breadcrumbs')
.service('Breadcrumbs', function(BaseComponent) {
    var breadcrumbs = new BaseComponent('Breadcrumbs');

    var state = {};
    var preAddedItems = {};

    var defaultItemObject = {
        name: '',
        unique: false,
        originalLabel: '',
        label: '',
        charLimit: undefined,
        charLimitAsLast: undefined,
        placeholder: undefined,
        callback: undefined
    };

    var canChangeItemProperty = function(name, index) {
        if (index < 0) { return false; }
        if (typeof state[name] === 'undefined') { return false; }
        if (index >= state[name].items.length) { return false; }
        return true;
    };

    var setItemLabel = function(name, itemObject, label, index) {
        if (typeof label === 'undefined') {
            label = typeof itemObject.originalLabel !== 'undefined ' ? itemObject.originalLabel : itemObject.label;
        }
        var newLabel = label;
        itemObject.originalLabel = label;
        if (label.length == 0 && typeof itemObject.placeholder !== 'undefined') {
            newLabel = label = itemObject.placeholder;
        }
        // Set charLimit if needed and if it's set.
        var charLimit = (index + 1) >= state[name].items.length ? itemObject['charLimitAsLast'] : itemObject['charLimit'];
        if (typeof charLimit === 'number') {
            charLimit = charLimit < 4 ? 4 : charLimit;
            if (newLabel.length > charLimit) {
                newLabel = newLabel.substr(0, charLimit) + '...';
            }
        }

        itemObject.label = newLabel;
    };

    var updateAllLabels = function(name) {
        for (var index in state[name].items) {
            setItemLabel(name, state[name].items[index], undefined, index);
        }
    }

    breadcrumbs.visible = function(name, value) {
        if (typeof state[name] !== 'undefined') {
            if (typeof value === 'boolean') {
                state[name].visible = value;
            }
            return state[name].visible;
        }
        return false;
    }

    breadcrumbs.add = function(name, conf) {
        var bcConf = {
            visible: true,
            firstItemPrefix: '',
            items: []
        };

        if (typeof conf !== 'undefined') {
            for (var i in conf) {
                bcConf[i] = conf[i];
            }
        }

        if (typeof preAddedItems[name] !== 'undefined') {
            bcConf.items = angular.copy(preAddedItems[name]);
            delete preAddedItems[name];
        }

        if (typeof state[name] === 'undefined') {
            state[name] = bcConf;
            updateAllLabels(name);
        }
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

    breadcrumbs.get = function(name) {
        if (typeof state[name] !== 'undefined') {
            return state[name];
        }
        return [];
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
        var extendedObject = angular.extend({}, defaultItemObject, itemObject);
        if (typeof extendedObject.name === 'undefined' || extendedObject.name.length == 0) {
            extendedObject.name = extendedObject.label;
        }

        if (typeof state[name] !== 'undefined') {
            // Check if other item with same name already exists.
            var idx = breadcrumbs.indexOfItem(name, extendedObject);
            if (idx !== -1) {
                if (state[name].items[idx].unique || extendedObject.unique) {
                    breadcrumbs.dropItemsFromIndex(name, idx + 1);
                    return;
                }
            }

            setItemLabel(name, extendedObject, extendedObject.label, state[name].items.length);
            state[name].items.push(extendedObject);
            updateAllLabels(name);
        }
        else {
            if (typeof preAddedItems[name] === 'undefined') {
                preAddedItems[name] = [];
            }

            preAddedItems[name].push(extendedObject);
        }
    }

    breadcrumbs.indexOfItem = function(name, item) {
        if (typeof state[name] !== 'undefined') {
            for (var i=0; i<state[name].items.length; i++) {
                if (state[name].items[i].name == item.name) {
                    return i;
                }
            }
        }
        return -1;
    }

    breadcrumbs.popItem = function(name) {
        if (typeof state[name] !== 'undefined') {
            state[name].items.pop();
            updateAllLabels(name);
        }
    }

    breadcrumbs.setItemLabel = function(name, index, label) {
        if (!canChangeItemProperty(name, index)) {
            return;
        }
        setItemLabel(name, state[name].items[index], label, index);
    }

    breadcrumbs.setItemCharLimit = function(name, index, charLimit) {
        if (!canChangeItemProperty(name, index)) {
            return;
        }
        state[name].items[index].charLimit = charLimit;
        setItemLabel(name, state[name].items[index], undefined, index);
    }

    breadcrumbs.setItemCharLimitAsLast = function(name, index, charLimit) {
        if (!canChangeItemProperty(name, index)) {
            return;
        }
        state[name].items[index].charLimitAsLast = charLimit;
        setItemLabel(name, state[name].items[index], undefined, index);
    }

    breadcrumbs.setItemPlaceholder = function(name, index, placeholder) {
        if (!canChangeItemProperty(name, index)) {
            return;
        }
        state[name].items[index].placeholder = placeholder;
        setItemLabel(name, state[name].items[index], undefined, index);
    }

    breadcrumbs.setFirstItemPrefix = function(name, label) {
        if (typeof state[name] === 'undefined') {
            return;
        }
        state[name].firstItemPrefix = label;
    }

    breadcrumbs.dropItemsFromIndex = function(name, index) {
        if (typeof state[name] !== 'undefined') {
            if (index >= state[name].items.length) {
                return;
            }
            index = index < 0 ? 0 : index;
            state[name].items.splice(index, state[name].items.length - index);
            updateAllLabels(name);
        }
    }

    return breadcrumbs;
});