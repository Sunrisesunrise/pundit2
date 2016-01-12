angular.module('Pundit2.Annotators')

    .service('CHOAnnotator', function(NameSpace, BaseComponent, $location,
                                        Consolidation, XpointersHelper, ImageFragmentAnnotatorHelper) {

  /*      // Create the component and declare what we deal with: text
        var CHO = new BaseComponent('CHOAnnotator');
        CHO.label = "CHO";
        CHO.type = NameSpace.types[ia.label];

        var CHOConsClass = "pnd-cons-CHO";
        //var svgTimeout;


        ia.wipe = function() {
            var imgCons = angular.element('.' + imgConsClass);
            imgCons.removeClass(imgConsClass);
            // imgCons.siblings('svg.pnd-polygon-layer').remove();
        };

        ia.wipeItem = function( /!*item*!/ ) {
            //TODO: ...
        };

        ia.svgHighlightByItem = function(item) {
            // TODO check if the svg is yet built
            var currentUri, imgReference, xpaths = [];
            if ((item.type.indexOf(ia.typeIF) !== -1) && (typeof(item.polygon) !== 'undefined')) {
                currentUri = item.parentItemXP;
                xpaths = XpointersHelper.getXPathsFromXPointers([currentUri]);
                if (currentUri in xpaths) {
                    imgReference = angular.element(xpaths[currentUri].startNode.firstElementChild);
                    ImageFragmentAnnotatorHelper.drawPolygonOverImage(item.polygon, imgReference);
                }
            }
        };

        ia.svgClearHighlightByItem = function( /!*item*!/ ) {
            angular.element('.' + imgConsClass).siblings('span.pnd-cons-svg').remove();
            // var currentUri, imgReference, xpaths = [];
            // if ((item.type.indexOf(ia.typeIF) !== -1) && (typeof(item.polygon) !== 'undefined')){
            //     currentUri = item.parentItemXP;
            //     xpaths = XpointersHelper.getXPathsFromXPointers([currentUri]);
            //     if (currentUri in xpaths) {
            //         imgReference = angular.element(xpaths[currentUri].startNode.firstElementChild);
            //         imgReference.siblings('svg.pnd-polygon-layer').remove();
            //     }
            // }
        };

        ia.highlightById = function() {
            // TODO
        };

        ia.clearHighlightById = function() {
            // TODO
        };

        ia.highlightByUri = function() {
            // TODO
        };

        ia.clearHighlightByUri = function() {
            // TODO
        };

        ia.log("Component up and running");
        return ia;*/
    });