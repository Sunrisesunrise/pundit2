angular.module('Pundit2.Model')

.constant('MODELHANDLERDEFAULTS', {})

.service('ModelHandler', function(BaseComponent, Config, MODELHANDLERDEFAULTS, Item, ItemsExchange, TypesHelper) {

    var modelHandler = new BaseComponent("ModelHandler", MODELHANDLERDEFAULTS);
    var annotationServerVersion = Config.annotationServerVersion;

    // forceAdd - annotation items and target might be already present
    // in ItemsExchange but "pageItems" container has been already removed, so
    // it's necessary to add again items to container.
    modelHandler.makeTargetsAndItems = function(data, forceAdd) {

        if (typeof(data) === 'undefined' ||
            typeof(data.target) === 'undefined' ||
            typeof(data.type) === 'undefined' ||
            typeof(data.items) === 'undefined') {
            modelHandler.err('Malformed data : ', data);
            return false;
        }

        var currentSelector;

        // Add types from data
        for (var t in data.type) {
            TypesHelper.addFromAnnotationRdf(t, data.type);
        }

        // Add items from data.items
        for (var uri in data.items) {
            Item.createFromItems(uri, data.items, forceAdd);
        }

        // Add items from data.target
        for (var uri in data.target) {
            Item.createFromTarget(uri, data.target, forceAdd);
        }

    };

    return modelHandler;
});