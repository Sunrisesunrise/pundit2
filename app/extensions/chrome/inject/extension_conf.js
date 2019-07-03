var punditConfig = {
    //annotationServerBaseURL: 'https://staging.punditbrain.netseven.it:8443/annotationserver/',
    annotationServerBaseURL: 'https://thepund.it/annotationserver/',
    annotationServerVersion: 'v2',
    // clientMode: 'lite',
    modules: {
        'Client': {
            active: true
        },
        // 'Annomatic': {
        //     active: true,
        //     sourceLang: 'fr' // test
        // },
        'Analytics': {
            doTracking: true,
            doMixpanel: true,
            trackingCode: "UA-72358132-1",
            chromeExtMode: true
        },
        'Korbo2Selector': {
            active: true,
            instances: [
                {
                    container: 'dandeliondbpedia',
                    infiniteScrolling: false,
                    label: 'DBPedia',
                    active: true,
                    basketID: null,
                    //url: 'http://dev.korbo2.org/v1',
                    language: 'en'
                }
            ]
        },
        'AnnotationsCommunication': {
            loadMultipleAnnotations: true
        }
    },
    templates: [],
    debugAllModules: true,
    limitToSuggestedTypes: true,
    disableImageAnnotation: true
}
