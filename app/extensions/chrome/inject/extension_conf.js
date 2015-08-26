var punditConfig = {
    //annotationServerBaseURL: " https://staging.punditbrain.netseven.it:8443/annotationserver/",
    //annotationServerVersion: 'v2',
    modules: {
        'Client': {
            active: true
        },
        'DbpediaSelector': {
            active: true,
            limit: 100
        }
    },
    templates: [],
    debugAllModules: true
}