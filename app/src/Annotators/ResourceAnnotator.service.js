angular.module('Pundit2.Annotators')

.constant('RESOURCEANNOTATIONRDEFAULTS', {
    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ResourceAnnotator
     *
     * @description
     * `object`
     *
     * Configuration object for ResourceAnnotator module.
     */

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#ResourceAnnotator.annotationButton
     *
     * @description
     * `boolean`
     *
     * Initial state of thposition:relative
     * <pre> defaultExpanded: false </pre>
     */
    annotationButton: true

    })

.service('ResourceAnnotator', function(BaseComponent, EventDispatcher, ItemsExchange, AnnotationsExchange, RESOURCEANNOTATIONRDEFAULTS) {
    var resourceAnnotator = new BaseComponent('ResourceAnnotator', RESOURCEANNOTATIONRDEFAULTS);
    var scopeMap = {};
    var uri = '';

    resourceAnnotator.addReference = function(uri, currentResource) {
        scopeMap[uri] = currentResource;
    };

    EventDispatcher.addListeners(
        [
            'Consolidation.consolidate'
        ],
        function() {
            var item;

            for (var uri in scopeMap) {
                item = ItemsExchange.getItemByUri(uri);
                if (typeof item !== 'undefined') {
                    scopeMap[uri].selected = true;
                    scopeMap[uri].setAnnotationNumber(uri);
                }
            }

        });
    EventDispatcher.addListeners(
        [
            'AnnotationsCommunication.deleteAnnotation',
            'AnnotationDetails.deleteAnnotation',
            'AnnotationsCommunication.saveAnnotation'
        ],
        function(e) {
            var ann = {};

            //if (e.args.length === 0) {
            //    return;
            //}
            ann = AnnotationsExchange.getAnnotationById(e.args);
            if (e.name === 'AnnotationsCommunication.saveAnnotation'){
                scopeMap[ann.entities[0]].addAnnotationNumber();
            }
            if(e.name === 'AnnotationsCommunication.deleteAnnotation'){
                scopeMap[uri].subAnnotationNumber();
            }
            if(e.name === 'AnnotationDetails.deleteAnnotation'){
                ann = AnnotationsExchange.getAnnotationById(e.args);
                uri = ann.entities[0];
            }

            if (typeof scopeMap[e.args[0].uri] !== 'undefined') {
                scopeMap[e.args[0].uri].selected = !scopeMap[e.args[0].uri].selected;
            }
            return;
        });

    return resourceAnnotator;
});