angular.module('Pundit2.Core')
.constant('FP3DEFAULTS', {
    label: 'Finish',
    link: '',
    active: false,
    debug: false
})
.service('Fp3', function(BaseComponent, FP3DEFAULTS, Config, $http, $q, $window, $document, AnnotationsExchange, XpointersHelper, Consolidation, ItemsExchange) {
    
    var fp3 = new BaseComponent("Fp3", FP3DEFAULTS);

    // the node that containt the html text passend inside POST
    var id = '#html-storage';

    // search and read the url of the first pundit content
    // inside the page
    fp3.getPunditContentUrl = function() {
        var url = angular.element('.pundit-content').attr('about');
        if (typeof(url) === 'undefined') {
            return '';
        }
        return url;
    };

    fp3.getNodeContent = function() {
        var content = angular.element(id).html();
        if (typeof(content) === 'undefined') {
            return '';
        }
        return content;
    };

    fp3.convertToFAM = function() {

        var newAnnotations = [];
        var item, graph, predicate, object, subject, newAnnotation;

        Consolidation.wipe();

        var annotations = AnnotationsExchange.getAnnotations();
        for (var a in annotations){

            subject = annotations[a]['entities'][0];
            graph = annotations[a]['graph'][subject];
            item = annotations[a]['items'][subject];

            for (var p in graph) {
                predicate = p;
                object = graph[predicate][0];
            }

            newAnnotation = Object();

            newAnnotation['annotatedAt'] = annotations[a]['created'];
            newAnnotation['annotatedBy'] = annotations[a]['creator'];
            newAnnotation['anchorOf'] = item['description'];
            newAnnotation['id'] = annotations[a]['id'];
            newAnnotation['pageContext'] = annotations[a]['pageContext'];
            newAnnotation['subject'] = subject;
            newAnnotation['predicate'] = predicate;
            newAnnotation['object'] = object['value'];
            if( object['type'] == 'uri') {
                newAnnotation['objectData'] = annotations[a]['items'][object['value']];
            } else {
                newAnnotation['objectData'] = Object;
            }

            var currentItem = ItemsExchange.getItemByUri(subject)

            if (currentItem.isTextFragment()){
            //if (subject.indexOf('xpointer')>-1){
                //this is an xpointer
                var punditContent = fp3.getPunditContentUrl();

                //var xp = subject.replace(punditContent , '');
                var xp = currentItem.getXPointer();

                var xpath = XpointersHelper.xPointerToXPath(xp);

                var start = xpath.startOffset;

                var end = xpath.endOffset;

                var startNodeText = xpath.startNode.data;
                var endNodeText = xpath.endNode.data;

                beforeStartOffset = xpath.startOffset - 10.0;
                beforeEndOffset = xpath.startOffset;

                if (beforeStartOffset < 0) beforeStartOffset = 0;

                afterStartOffset = xpath.endOffset;
                afterEndOffset = parseInt(xpath.endOffset) + 10.0;

                if (afterEndOffset > endNodeText.length) afterEndOffset = endNodeText.length;

                var before=startNodeText.substring(beforeStartOffset, beforeEndOffset)
                var after=endNodeText.substring(afterStartOffset, afterEndOffset)

                newAnnotation['before'] = before;
                newAnnotation['after'] = after;

                newAnnotation['start'] = start;
                newAnnotation['end'] = end;
            }
 
            newAnnotations.push(newAnnotation);
        }

        Consolidation.consolidateAll();

        return newAnnotations;
    };

    fp3.post = function() {
        var promise = $q.defer();

        if (fp3.options.link === '') {
            fp3.log("Error: you must configure a link to POST data");
            return;
        }

        $http({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: fp3.options.link + '?fp=on',
            data: {
                annotations:  fp3.convertToFAM(),
                punditContent: fp3.getPunditContentUrl(),
                punditPage: fp3.getNodeContent(),
                annotationServerBaseURL: Config.annotationServerBaseURL
            },
            withCredentials: true
        }).success(function() {
            fp3.log("Success: fp3 post data");
            $window.close();
        }).error(function(msg) {
            fp3.log("Error: impossible to post data", msg);
            promise.reject();
        });

        return promise.promise;
    };

    fp3.log('Up and Running');

    return fp3;

});