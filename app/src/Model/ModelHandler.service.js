angular.module('Pundit2.Model')

.constant('MODELHANDLERDEFAULTS', {})

.service('ModelHandler', function(BaseComponent, Config, MODELHANDLERDEFAULTS, NameSpace, Item, ItemsExchange) {

    var modelHandler = new BaseComponent("ModelHandler", MODELHANDLERDEFAULTS);
    var annotationServerVersion = Config.annotationServerVersion;

    modelHandler.makeTargetsAndItems = function(data) {
        if (typeof(data) === "undefined" ||
            typeof(data.target) === "undefined" ||
            typeof(data.items) === "undefined") {
            modelHandler.err('Malformed data : ', data);
            return false;
        }

        var currentSelector;

        // Add items from data
        for (var uri in data.items) {
            var item = ItemsExchange.getItemByUri(uri);
            if (typeof(item) === "undefined") {
                item = new Item(uri);

                if (item.isProperty()) {
                    // Add specific flag, this properties are deleted if an other property 
                    // with the same uri is added
                    item.isAnnotationProperty = true;
                }

                // And read what the annotation says about the item
                item.fromAnnotationRdf(data.items);
            }
        }

        // Add target items 
        for (var uri in data.target) {
            if (data.target[uri][NameSpace.rdf.type][0].value === NameSpace.fragments.text) {
                currentSelector = data.target[uri][NameSpace.annotation.hasSelector][0].value;
                console.log(data.target[currentSelector]);
            }
        }

    };

    return modelHandler;
});