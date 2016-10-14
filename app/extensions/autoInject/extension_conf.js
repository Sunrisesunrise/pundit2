var punditConfig = {
    autoInjectMode : true,
    annotationServerBaseURL: 'https://thepund.it/annotationserver/',
    annotationServerVersion: 'v2',
    homeBaseURL: 'https://thepund.it/app/home/',
    contributions: {
        active: true,
        textLink: 'Europeana Terms for User Contributions',
        link: 'http://www.europeana.eu/portal/rights/contributions.html'
    },
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
            basicRelations: [
            {
                "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
                "description": "The Subject has a generic relation with the Object.",
                "label": "is related to",
                "suggestedSubjectTypes": [],
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
                }, {
                    container: 'mimo',
                    label: 'Instrument',
                    active: true,
                    basketID: null,
                    language: 'en',
                    url: 'http://korbo2.org/v1'
                }

            ],
            limit: 999
        },
        'Analytics': {
            doTracking: true,
            trackingCode: "UA-57917488-4",
            doMixpanel: true,
            trackingCodeMixpanel: '869815b2c9e577970109f097dc5ea23c',
            chromeExtMode: true
        },
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
            label: 'Instrument Tag',
            types: ['', 'resource'],
            triples: [{
                subject: {
                    selectedItem: true
                },
                predicate: {
                    uri: 'http://www.w3.org/2004/02/skos/core#related'
                },
                object: {
                    selectors: ["Instrument"],
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
                    uri: 'http://www.w3.org/2004/02/skos/core#related'
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
            label: 'Semantic Tag',
            types: ['text-fragment', 'resource'],
            triples: [{
                subject: {
                    selectedItem: true
                },
                predicate: {
                    uri: 'http://www.w3.org/2004/02/skos/core#related'
                },
                object: {
                    forceFocus: true
                }
            }]
        }]
    }
};