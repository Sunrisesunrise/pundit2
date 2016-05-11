var punditConfig = {
    autoInjectMode : true,
    //   confURL: "http://conf.thepund.it/V2/clients/eus/eus.js",
    annotationServerBaseURL: " https://staging.punditbrain.netseven.it:8443/annotationserver/",
    // annotationServerBaseURL: 'https://server.thepund.it/annotationserver/',
    // debugAllModules: true,
    annotationServerVersion: 'v2',
    modules: {
        'ResourceAnnotator' : {
            annotationButton: true
        },
        'AnnotationsCommunication': {
            loadMultipleAnnotations: true
        },
        'AnnotationSidebar': {
            isAnnotationSidebarExpanded: true,
            social: true
        },
        'AnnotationDetails': {
            social: true,
            reply: true,
            like: true,
            dislike: true,
            report: true,
            endorse: true,
            replyLike: true,
            replyDislike: true,
            replyReport: true,
            replyEndorse: true
        },
        'Client': {
            active: true,
            hiddenBootstrap: true,
            basicRelations: [{
                "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
                "label": "comment",
                "description": "Leave a comment related to the selected text fragment or web page.",
                "suggestedSubjectTypes": [
                    "http://schema.org/WebPage"
                ],
                "suggestedObjectTypes": ["http://www.w3.org/2000/01/rdf-schema#Literal"],
                "vocabulary": "Basic Relation",
                "uri": "http://www.w3.org/2000/01/rdf-schema#comment"
            }, {
                "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
                "description" : "Any concept coming from external vocabularies (OpenSKOS/Genre, Freebase, DbPedia) and digital objects from Europeana related to the audio resource.",
                "label": "has tag (talks about)",
                "suggestedSubjectTypes": [
                    "http://schema.org/WebPage"
                ],
                "suggestedObjectTypes": [],
                "vocabulary": "Basic Relation",
                "uri": "http://purl.org/pundit/ont/oa#talksAbout"
            }, {
                "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
                "label": "is related to",
                "description": "The Subject (a text fragment or a web page) has a generic relation with the Object (text fragment, web page or linked data entity).",
                "suggestedSubjectTypes": [
                    "http://purl.org/pundit/ont/ao#fragment-text",
                    "http://schema.org/WebPage"
                ],
                "suggestedObjectTypes": [],
                "vocabulary": "Basic Relation",
                "uri": "http://www.w3.org/2004/02/skos/core#related"
            }]
        },
        'Toolbar': {
            askThePundit: false
        },
        'DbpediaSelector': {
            active: true
        },
        'EuropeanaSelector': {
            active: true
        },
        'Korbo2Selector': {
            active: true,
            instances: [{
                container: 'korbo',
                label: 'Genre',
                active: true,
                basketID: 2,
                url: 'http://korbo2.org/v1',
                language: 'en'
            },
                {
                    container: 'mimo',
                    label: 'Mimo',
                    active: true,
                    basketID: null,
                    language: 'en',
                    url: 'http://korbo2.org/v1'
                }

            ],
            limit: 999
        },
        //'Analytics': {
        //    doTracking: true,
        //    trackingCode: "UA-57917488-3"
        //},
        // MANAGE Contextual Menu
        'ResourceHandler': {
            useAsObject: false,
            useAsSubject: false
        }
    },
    useTemplates: false,
    disableImageAnnotation: true,
    // contextual Templates
    template: {
        active: true,
        list: [{
            label: 'MIMO Tag',
            types: ['', 'resource'],
            triples: [{
                subject: {
                    selectedItem: true
                },
                predicate: {
                    uri: 'http://purl.org/pundit/ont/oa#talksAbout'
                },
                object: {
                    selectors: ["Mimo"],
                    forceFocus: true
                }
            }]
        }, {
            label: 'Genre Tag',
            types: ['text-fragment', 'resource'],
            triples: [{
                subject: {
                    selectedItem: true
                },
                predicate: {
                    uri: 'http://purl.org/pundit/ont/oa#talksAbout'
                },
                object: {
                    selectors: ["Genre"],
                    forceFocus: true
                }
            }]
        }, {
            label: 'Europeana Link',
            types: ['text-fragment', 'resource'],
            triples: [{
                subject: {
                    selectedItem: true
                },
                predicate: {
                    uri: 'http://www.w3.org/2004/02/skos/core#related'
                },
                object: {
                    selectors: ["Europeana"],
                    forceFocus: true
                }
            }]
        }, {
            label: 'Tag me',
            types: ['text-fragment', 'resource'],
            triples: [{
                subject: {
                    selectedItem: true
                },
                predicate: {
                    uri: 'http://purl.org/pundit/ont/oa#talksAbout'
                },
                object: {
                    forceFocus: true
                }
            }]
        }]
    }
};