angular.module('Pundit2.Model')

.constant('MODELHANDLERDEFAULTS', {})

.service('ModelHandler', function(BaseComponent, MODELHANDLERDEFAULTS, Item, ItemsExchange, TypesHelper, NameSpace) {

    var modelHandler = new BaseComponent("ModelHandler", MODELHANDLERDEFAULTS);

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

        // Add types from data
        for (var t in data.type) {
            TypesHelper.addFromAnnotationRdf(t, data.type);
        }

        // Add items from data.items
        for (var itemUri in data.items) {
            Item.createFromItems(itemUri, data.items, forceAdd);
        }

        // Add items from data.target
        for (var targetUri in data.target) {
            Item.createFromTarget(targetUri, data.target, forceAdd);
        }

    };

    modelHandler.makeGraph = function(data) {
        for (var metadataURI in data.metadata) {
            var metadata = data.metadata[metadataURI],
                bodyReferences = metadata[NameSpace.annotation.hasBody];
            
            var graphURI, currentGraph;

            if (typeof bodyReferences !== 'undefined') {
                graphURI = bodyReferences[0].type === 'uri' ? bodyReferences[0].value : bodyReferences[1].value;
                currentGraph = data.graph[graphURI];
            } else {
                currentGraph = {};
            } 

            data.graph = currentGraph;
        }
    };

    return modelHandler;
});