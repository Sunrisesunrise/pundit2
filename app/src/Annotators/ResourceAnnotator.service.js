angular.module('Pundit2.Annotators')

    .service('ResourceAnnotator', function (BaseComponent, EventDispatcher, ItemsExchange) {
        var resourceAnnotator = new BaseComponent('ResourceAnnotator');
        var scopeMap = {};

        resourceAnnotator.addReference = function (uri, currentResource) {
            scopeMap[uri] = currentResource;
        };

        EventDispatcher.addListeners(
            [
                'Consolidation.consolidate'
            ],
            function() {
                var item;

                for (uri in scopeMap){
                    item = ItemsExchange.getItemByUri(uri);
                    if (typeof item !== "undefined") {
                        scopeMap[uri].selected = true;
                    }
                }
            });
        EventDispatcher.addListeners(
            [
                'AnnotationsCommunication.deleteItems',
                'AnnotationsCommunication.saveAnnotation'
            ],
            function(e) {
                if (e.args.length === 0) {
                    return;
                }
                if(typeof scopeMap[e.args[0].uri] !== 'undefined'){
                    scopeMap[e.args[0].uri].selected = !scopeMap[e.args[0].uri].selected;
                }
                return;
            });

        return resourceAnnotator;
    });