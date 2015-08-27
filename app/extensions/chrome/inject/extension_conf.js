var punditConfig = {
    annotationServerBaseURL: " https://staging.punditbrain.netseven.it:8443/annotationserver/",
    annotationServerVersion: 'v2',
    modules: {
        'Client': {
            active: true
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
        }
    },
    templates: [],
    debugAllModules: true
}