describe("AnnotationSidebar interaction", function() {

    // Constant
    // TODO: read from service
    var sidebarExpandedWidth = 300;

    var firstAnnotation = "annid123",
        secondAnnotation = "annid124";

    var p = protractor.getInstance();

    // var fs = require('fs'),
    //     myHttpMock;

    // fs.readFile('test/e2e/annHttpMock.e2e.js', 'utf8', function(err, data) {
    //     if (err) {
    //         console.log('You need an annHttpMock.e2e.js in test/e2e/');
    //         return console.log(err);
    //     }
    //     /* jshint -W061 */
    //     eval(data);
    //     /* jshint +W061 */
    //     myHttpMock = annHttpMock;
    // });    

    var annHttpMock;
    annHttpMock = function() {
        angular.module('httpBackendMock', ['ngMockE2E'])
            .run(function($httpBackend, NameSpace) {

                // This objects are a mock of the server response
                // To test a functionality that made an http call add here the necessarry
                // server response and add an $httpBackend.whenGET('yourUrl').respond(yourResponse);

                var annResponse = {
                    graph: {
                        "http://fake-url.it/release_bot/build/examples/dante-1.html": {
                          "http://purl.org/spar/cito/cites": [
                            {
                              value: "http://purl.org/pundit/ont/ao#fragment-text",
                              type: "uri"
                            }
                          ]
                        }
                    },
                    items: {
                        "http://purl.org/pundit/ont/ao#fragment-text": {
                            "http://www.w3.org/2000/01/rdf-schema#label":
                                [{type: "literal", value: "Text fragment"}]
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property": {
                            "http://www.w3.org/2000/01/rdf-schema#label":
                                [{type: "literal", value: "Property"}]
                        },
                        "http://fake-url.it/release_bot/build/examples/dante-1.html": {
                          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type":
                                [{type: "uri", value: "http://purl.org/pundit/ont/ao#fragment-text"}],
                          "http://purl.org/dc/elements/1.1/description":
                                [{type: "literal", value: "originally"}],
                          "http://www.w3.org/2000/01/rdf-schema#label":
                                [{type: "literal", value: "originally"}],
                          "http://purl.org/pundit/ont/ao#hasPageContext":
                                [{type: "uri", value: "http://localhost/pundit/examples/client-TEST.html"}],
                          "http://purl.org/dc/terms/isPartOf":
                                [{type: "uri", value: "http://fake-url.it/release_bot/build/examples/dante-1.html"}],
                        },
                        "http://purl.org/spar/cito/cites": {
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [{type: "uri", value: 'Property'}]

                        }
                    },
                    metadata: {
                        "http://purl.org/pundit/demo-cloud-server/annotation/annid123": {
                            "http://purl.org/pundit/ont/ao#hasPageContext":
                                [{type: "uri", value: "http://localhost:9000/app/examples/client-TEST.html"}],
                            "http://purl.org/pundit/ont/ao#isIncludedIn":
                                [{type: "uri", value: "http://purl.org/pundit/demo-cloud-server/notebook/ntid123"}],
                            "http://purl.org/dc/terms/creator":
                                [{type: "uri", value: "http://purl.org/pundit/demo-cloud-server/user/userid123"}],
                            "http://purl.org/dc/elements/1.1/creator":
                                [{type: "literal", value: "Creator User Name"}],
                            "http://www.openannotation.org/ns/hasTarget":
                                [{type: 'uri', value: 'http://metasound.dibet.univpm.it/exmaple'}]

                        }

                    }
                };

                var annResponse2 = {
                    graph: {
                        "http://fake-url.it/empty.html#xpointer(start-point(string-range(//DIV[@about='http://fake-url.it/empty.html']/DIV[1]/P[2]/B[2]/text()[1],'',0))/range-to(string-range(//DIV[@about='http://fake-url.it/empty.html']/DIV[1]/P[2]/B[2]/text()[1],'',5)))": {
                            "http://schema.org/comment": [{ value: "poeta italiano del 1300", type: "literal"}]
                        }
                    },
                    items: {
                        "http://fake-url.it/empty.html#xpointer(start-point(string-range(//DIV[@about='http://fake-url.it/empty.html']/DIV[1]/P[2]/B[2]/text()[1],'',0))/range-to(string-range(//DIV[@about='http://fake-url.it/empty.html']/DIV[1]/P[2]/B[2]/text()[1],'',5)))": {
                            "http://purl.org/dc/terms/isPartOf":
                                [{type: "uri", value: "http://fake-url.it/empty.html"}],
                            "http://purl.org/pundit/ont/ao#hasPageContext":
                                [{type: "uri", value: "http://localhost:9000/app/examples/client-TEST.html"}],
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type":
                                [{type: "uri", value: "http://purl.org/pundit/ont/ao#fragment-text"}],
                            "http://www.w3.org/2000/01/rdf-schema#label":
                                [{type: "literal", value: "Dante"}],
                        },
                        "http://schema.org/comment": {
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [{type: "uri", value: NameSpace.rdf.property}],
                            "http://www.w3.org/2000/01/rdf-schema#label": [{type: "literal", value: "has comment (free text)"}]

                        },
                        "http://purl.org/pundit/ont/ao#fragment-text": {
                            "http://www.w3.org/2000/01/rdf-schema#label":
                                [{type: "literal", value: "Text fragment"}]
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property": {
                            "http://www.w3.org/2000/01/rdf-schema#label":
                                [{type: "literal", value: "Property"}]
                        }
                    },
                    metadata: {
                        "http://purl.org/pundit/demo-cloud-server/annotation/annid124": {
                            // TODO others property if necessary
                            "http://purl.org/pundit/ont/ao#hasPageContext":
                                [{type: "uri", value: "http://localhost:9000/app/examples/client-TEST.html"}],
                            "http://purl.org/pundit/ont/ao#isIncludedIn":
                                [{type: "uri", value: "http://purl.org/pundit/demo-cloud-server/notebook/ntid123"}],
                            "http://purl.org/dc/terms/creator":
                                [{type: "uri", value: "http://purl.org/pundit/demo-cloud-server/user/userid123"}],
                            "http://purl.org/dc/elements/1.1/creator":
                                [{type: "literal", value: "Creator User Name"}]
                        }

                    }
                };

                var annResponse3 = {
                    "metadata": {
                        "http://purl.org/pundit/demo-cloud-server/annotation/annid125": {
                            "http://purl.org/pundit/ont/ao#isIncludedIn": [
                                {
                                    "value": "http://purl.org/pundit/demo-cloud-server/notebook/1a04bf22",
                                    "type": "uri"
                                }
                            ],
                            "http://www.openannotation.org/ns/hasBody": [
                                {
                                    "value": "http://purl.org/pundit/demo-cloud-server/graph/annotationGraph-2c77eec3",
                                    "type": "uri"
                                }
                            ],
                            "http://purl.org/dc/terms/creator": [
                                {
                                    "value": "http://purl.org/pundit/demo-cloud-server/user/4ac21247",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                                {
                                    "value": "http://www.openannotation.org/ns/Annotation",
                                    "type": "uri"
                                }
                            ],
                            "http://purl.org/pundit/ont/ao#items": [
                                {
                                    "value": "http://purl.org/pundit/demo-cloud-server/graph/itemsGraph-2c77eec3",
                                    "type": "uri"
                                }
                            ],
                            "http://www.openannotation.org/ns/hasTarget": [
                                {
                                    "value": "http://fake-url.it/release_bot/build/examples/dante-1.html#xpointer(start-point(string-range(//DIV[@about='http://fake-url.it/release_bot/build/examples/dante-1.html']/DIV[1]/P[2]/B[1]/text()[1],'',14))/range-to(string-range(//DIV[@about='http://fake-url.it/release_bot/build/examples/dante-1.html']/DIV[1]/P[2]/B[1]/text()[1],'',18)))",
                                    "type": "uri"
                                }
                            ],
                            "http://purl.org/dc/terms/created": [
                                {
                                    "value": "2015-02-27T05:02:01",
                                    "type": "literal",
                                    "datatype": "http://www.w3.org/2001/XMLSchema#dateTime"
                                }
                            ],
                            "http://purl.org/pundit/ont/ao#id": [
                                {
                                    "value": "2c77eec3",
                                    "type": "literal"
                                }
                            ],
                            "http://purl.org/pundit/ont/ao#hasTemplate": [
                                {
                                    "value": "http://conf.thepund.it/V2/templates/tagFixedMarx",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Annotation 2015-02-27T05:02:01",
                                    "type": "literal",
                                    "datatype": "http://www.w3.org/2001/XMLSchema#string"
                                }
                            ],
                            "http://purl.org/dc/elements/1.1/creator": [
                                {
                                    "value": "Giulio Andreini",
                                    "type": "literal"
                                }
                            ],
                            "http://purl.org/pundit/ont/ao#hasPageContext": [
                                {
                                    "value": "http://demo-cloud.as.thepund.it/pundit2/build/client.html",
                                    "type": "uri"
                                }
                            ]
                        }
                    },
                    "graph": {
                        "http://fake-url.it/release_bot/build/examples/dante-1.html#xpointer(start-point(string-range(//DIV[@about='http://fake-url.it/release_bot/build/examples/dante-1.html']/DIV[1]/P[2]/B[1]/text()[1],'',14))/range-to(string-range(//DIV[@about='http://fake-url.it/release_bot/build/examples/dante-1.html']/DIV[1]/P[2]/B[1]/text()[1],'',18)))": {
                            "http://purl.org/pundit/ont/oa#talksAbout": [
                                {
                                    "value": "http://www.freebase.com/m/048cl",
                                    "type": "uri"
                                }
                            ]
                        }
                    },
                    "items": {
                        "http://www.freebase.com/schema/base/activism/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/organization/organization_founder": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Organization founder",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/influence/influence_node": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Influence Node",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/tagit/concept": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Concept",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/m/048cl": {
                            "http://purl.org/dc/elements/1.1/description": [
                                {
                                    "value": "Karl Marx was a German philosopher, economist, sociologist, and revolutionary socialist. Marx's work in economics laid the basis for much of the current understanding of labour and its relation to capital, and subsequent economic thought. He is one of the founders of sociology and social science. He published numerous books during his lifetime, the most notable being The Communist Manifesto and Das Kapital.\nBorn into a wealthy middle-class family in Trier in the Prussian Rhineland, Marx studied at the University of Bonn and the University of Berlin where he became interested in the philosophical ideas of the Young Hegelians. After his studies he wrote for a radical newspaper in Cologne and began to work out the theory of the materialist conception of history. He moved to Paris in 1843, where he began writing for other radical newspapers and met Friedrich Engels, who would become his lifelong friend and collaborator. In 1849 he was exiled and moved to London together with his wife and children, where he continued writing and formulating his theories about social and economic activity.",
                                    "type": "literal"
                                }
                            ],
                            "http://xmlns.com/foaf/0.1/depiction": [
                                {
                                    "value": "https://usercontent.googleapis.com/freebase/v1/image/m/048cl",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                                {
                                    "value": "http://www.freebase.com/schema/common/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/influence/influence_node",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/book/book_subject",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/people/person",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/book/author",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/people/deceased_person",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/user/alust/default_domain/processed_with_review_queue",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/schemastaging/context_name",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/ihistory/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/ihistory/person",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/kwebbase/kwtopic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/greatbooksofthewesternworld/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/ontologies/ontology_instance",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/symbols/name_source",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/user/alexander/philosophy/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/user/alexander/philosophy/philosopher",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/film/film_subject",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/tagit/concept",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/organization/organization_founder",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/tv/tv_subject",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/greatbooksofthewesternworld/author",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/litcentral/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/film/actor",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/atheism/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/user/agroschim/default_domain/significant_follower",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/activism/activist",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/activism/topic",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/atheism/atheist",
                                    "type": "uri"
                                },
                                {
                                    "value": "http://www.freebase.com/schema/base/litcentral/named_person",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Karl Marx",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://purl.org/pundit/ont/ao#fragment-text": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Text fragment",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/litcentral/named_person": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Named person",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://purl.org/pundit/ont/oa#talksAbout": {
                            "http://purl.org/dc/elements/1.1/description": [
                                {
                                    "value": "The selected text fragment talks about some other text, Entity, Person or any other kind of concept",
                                    "type": "literal"
                                }
                            ],
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                                {
                                    "value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "talks about",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/schemastaging/context_name": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Context name",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/symbols/name_source": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Name source",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://fake-url.it/release_bot/build/examples/dante-1.html#xpointer(start-point(string-range(//DIV[@about='http://fake-url.it/release_bot/build/examples/dante-1.html']/DIV[1]/P[2]/B[1]/text()[1],'',14))/range-to(string-range(//DIV[@about='http://fake-url.it/release_bot/build/examples/dante-1.html']/DIV[1]/P[2]/B[1]/text()[1],'',18)))": {
                            "http://purl.org/dc/elements/1.1/description": [
                                {
                                    "value": "Alig",
                                    "type": "literal"
                                }
                            ],
                            "http://purl.org/dc/terms/isPartOf": [
                                {
                                    "value": "http://fake-url.it/release_bot/build/examples/dante-1.html",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                                {
                                    "value": "http://purl.org/pundit/ont/ao#fragment-text",
                                    "type": "uri"
                                }
                            ],
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Alig",
                                    "type": "literal"
                                }
                            ],
                            "http://purl.org/pundit/ont/ao#hasPageContext": [
                                {
                                    "value": "http://demo-cloud.as.thepund.it/pundit2/build/client.html",
                                    "type": "uri"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/user/alexander/philosophy/philosopher": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Philosopher",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/litcentral/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/user/alust/default_domain/processed_with_review_queue": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Processed with Review Queue",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Property",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/people/person": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Person",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/film/actor": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Film actor",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/greatbooksofthewesternworld/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/tv/tv_subject": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "TV subject",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/atheism/atheist": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Atheist",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/activism/activist": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Activist",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/ontologies/ontology_instance": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Ontology Instance",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/book/author": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Author",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/ihistory/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/kwebbase/kwtopic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "KWTopic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/user/alexander/philosophy/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/greatbooksofthewesternworld/author": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Author",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/atheism/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/people/deceased_person": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Deceased Person",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/base/ihistory/person": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "person",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/film/film_subject": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Film subject",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/book/book_subject": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Literature Subject",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/user/agroschim/default_domain/significant_follower": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Founder/significant follower",
                                    "type": "literal"
                                }
                            ]
                        },
                        "http://www.freebase.com/schema/common/topic": {
                            "http://www.w3.org/2000/01/rdf-schema#label": [
                                {
                                    "value": "Topic",
                                    "type": "literal"
                                }
                            ]
                        }
                    }
                };

                var userLoggedIn = {
                    loginStatus: 1,
                    id: "userid123",
                    uri: "http://purl.org/pundit/demo-cloud-server/user/userid123",
                    openid: "http://myOpenId.fake",
                    firstName: "Mario",
                    lastName: "Rossi",
                    fullName: "Mario Rossi",
                    email: "mario@rossi.it",
                    loginServer: "http:\/\/demo-cloud.as.thepund.it:8080\/annotationserver\/login.jsp"
                };

                var annMedatadaSearch = {
                    "http://sever.url/annotation/annid123": {
                        // annotation medatada here if necessary
                    },
                    "http://sever.url/annotation/annid124": {
                        // annotation medatada here if necessary
                    }
                    ,
                    "http://sever.url/annotation/annid125": {
                        // annotation medatada here if necessary
                    }
                };

                var notebookMedatada = {
                    "http://sever.url/notebook/ntid123": {
                        // notebook medatada here if necessary
                        "http://open.vocab.org/terms/visibility":
                            [{type: "literal", value: "public"}],
                        "http://www.w3.org/2000/01/rdf-schema#label":
                            [{type: "literal", value: "Notebook Name"}],
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type":
                            [{type: "uri", value: "http://purl.org/pundit/ont/ao#Notebook"}],
                        "http://purl.org/pundit/ont/ao#id":
                            [{type: "literal", value: "ntid123"}]
                    }
                };

                var notebookCurrent = {
                    NotebookID: "ntid123"
                };

                var notebooksOwned = {
                    NotebookIDs: ["ntid123"]
                };

                var templates = {
                    label: 'Template Name',
                    triples : [
                        {
                            predicate: {
                                "label": "talks about",
                                "domain": ["http://purl.org/pundit/ont/ao#fragment-text"],
                                "range": [],
                                "uri": "http://purl.org/pundit/ont/oa#talksAbout"
                            }
                        }
                    ]
                };

                // extend here if you nedd to catch an unexpected http call
                // if user is logged do this http call

                // get user status (user logged)
                $httpBackend.whenGET(NameSpace.get('asUsersCurrent')).respond(userLoggedIn);
                // get my items
                $httpBackend.whenGET(new RegExp("http://test.config.url/api/services/preferences/favorites")).respond(undefined);
                // get my notebooks
                $httpBackend.whenGET(NameSpace.get('asNBOwned')).respond(notebooksOwned);
                // get annotations on annotations API
                $httpBackend.whenGET(new RegExp("http://test.config.url/api/annotations/metadata/search")).respond(annMedatadaSearch);
                $httpBackend.whenGET(new RegExp("http://test.config.url/api/annotations/annid123")).respond(annResponse);
                $httpBackend.whenGET(new RegExp("http://test.config.url/api/annotations/annid124")).respond(annResponse2);
                $httpBackend.whenGET(new RegExp("http://test.config.url/api/annotations/annid125")).respond(annResponse3);
                // get notebooks metadata
                $httpBackend.whenGET(NameSpace.get('asNBMeta', {id: "ntid123"})).respond(notebookMedatada);
                // get current notebook
                $httpBackend.whenGET(NameSpace.get('asNBCurrent')).respond(notebookCurrent);
                // get configured templates
                $httpBackend.whenJSONP(new RegExp("http://template-test-url.com/t1")).respond(templates);

            });
    };
    var myHttpMock = annHttpMock;


    beforeEach(function(){
        p.driver.manage().window().setSize(1200, 960);
        p.addMockModule('httpBackendMock', myHttpMock);
        p.get('/app/examples/client-TEST.html');
    });

    afterEach(function() {
        p.removeMockModule('httpBackendMock');
    });

    it('should toggle the sidebar', function() {
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();

        var container = p.findElement(protractor.By.css('.pnd-annotation-sidebar-container'));
        container.getSize().then(function(size){
            expect(size.width).toBe(sidebarExpandedWidth);
        });
    });

    it('should toggle the filers list', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(0);
        });
    });

    it('should create annotation details', function() {
        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(1);
        });
    });

    it('should open the sidebar and details after click on annotation', function() {
        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(1);
        });

        p.findElement(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-header')).click();

        var container = p.findElement(protractor.By.css('.pnd-annotation-sidebar-container'));
        container.getSize().then(function(size){
            expect(size.width).toBe(sidebarExpandedWidth);
        });

        p.findElements(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
    });

    it('should expand and collapse one annotation at a time', function() {
        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(1);
        });
        p.findElements(protractor.By.css('#'+secondAnnotation)).then(function(elements) {
            expect(elements.length).toBe(1);
        });

        p.findElements(protractor.By.css('.pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(0);
        });
        p.findElement(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-header')).click();
        p.findElements(protractor.By.css('.pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });

        p.findElement(protractor.By.css('#'+secondAnnotation+' .pnd-annotation-details-header')).click();
        p.findElements(protractor.By.css('.pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
    });

    it('should close annotation details after the close of the sidebar', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-header')).click();

        p.findElements(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });

        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();

        p.findElements(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(0);
        });
    });

    it('should toggle annotation details', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-header')).click();

        p.findElements(protractor.By.css('#'+firstAnnotation+' .pnd-annotation-details-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
    });

    it('should hide broken annotations', function() {
        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(1);
        });
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-filter-broken')).click();
        
        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(0);
        });
    });

    it('should remove all filters', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-filter-broken')).click();
        
        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(0);
        });

        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-close-filters')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-remove-filters')).click();

        p.findElements(protractor.By.css('#'+firstAnnotation)).then(function(elements) {
            expect(elements.length).toBe(1);
        });
    });

    it('should sidebar margin-top be dependent from toolbar height and dashboard height', function() {
        var toolbarHeight;
        var dashboardHeight;
        var globalHeight;

        var sidebarContainer = p.findElement(protractor.By.css('.pnd-annotation-sidebar-container'));
        var dashboardContainer = p.findElement(protractor.By.css('.pnd-dashboard-container'));
        var toolbarContainer = p.findElement(protractor.By.css('.pnd-toolbar-navbar-container'));

        var dashboardFooter = p.findElement(protractor.By.css('.pnd-dashboard-container .pnd-dashboard-footer'));

        // p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();

        toolbarContainer.getSize().then(function(size){
            toolbarHeight = size.height +1;
            sidebarContainer.getCssValue('margin-top').then(function(sidebarTop){
                expect(toolbarHeight + "px").toEqual(sidebarTop);
            });

            p.findElement(protractor.By.css('.pnd-toolbar-toggle-button')).click();

            dashboardContainer.getSize().then(function(size){
                dashboardHeight = size.height;
                globalHeight = toolbarHeight + dashboardHeight;
                sidebarContainer.getCssValue('margin-top').then(function(sidebarTop){
                    expect(globalHeight + "px").toEqual(sidebarTop);
                });
            });

            p.findElement(protractor.By.css('.pnd-toolbar-toggle-button')).click();

            sidebarContainer.getCssValue('margin-top').then(function(sidebarTop){
                expect(toolbarHeight + "px").toEqual(sidebarTop);
            });

            p.findElement(protractor.By.css('.pnd-toolbar-toggle-button')).click();
            p.actions().dragAndDrop(dashboardFooter, {x:0, y:100}).perform();

            dashboardContainer.getSize().then(function(size){
                dashboardHeight = size.height;
                globalHeight = toolbarHeight + dashboardHeight;
                sidebarContainer.getCssValue('margin-top').then(function(sidebarTop){
                    expect(globalHeight + "px").toEqual(sidebarTop);
                });
            });
        });
    });

    it('should hide filter list after click on show all annotations', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(0);
        });

        p.findElements(protractor.By.css('.pnd-text-fragment-icon')).then(function(elements) {
            elements[0].click();
            p.findElements(protractor.By.css('.dropdown-menu li a')).then(function(a){
                expect(a.length).toBe(4);
                expect(a[3].getText()).toBe('Show all annotations of this item');
                a[3].click();
                p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list.ng-hide')).then(function(elements) {
                    expect(elements.length).toBe(1);
                });
            });
        });
    });

    it('should hide filter list after click on show all annotations', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list.ng-hide')).then(function(elements) {
            expect(elements.length).toBe(0);
        });
            
        p.findElements(protractor.By.css('.pnd-text-fragment-icon')).then(function(elements) {
            elements[0].click();
            p.findElements(protractor.By.css('.dropdown-menu li a')).then(function(a){
                expect(a.length).toBe(4);
                expect(a[3].getText()).toBe('Show all annotations of this item');
                a[3].click();
                p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list.ng-hide')).then(function(elements) {
                    expect(elements.length).toBe(1);
                });
            });
        });
    });

    it('should apply correctly the filters', function() {
        p.findElements(protractor.By.css('.pnd-annotation-details-wrap')).then(function(elements) {
            expect(elements.length).toBe(3);
        });

        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();

        p.findElement(protractor.By.css('.pnd-annotation-sidebar-filter-input-contains input')).sendKeys('Dante');

        p.findElements(protractor.By.css('.pnd-annotation-details-wrap')).then(function(elements) {
            expect(elements.length).toBe(1);
        });

        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-close-filters')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-remove-filters')).click();

        p.findElements(protractor.By.css('.pnd-annotation-details-wrap')).then(function(elements) {
            expect(elements.length).toBe(3);
        });
    });

    it('should apply partial filters', function() {
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('.pnd-annotation-sidebar-btn-show-filter')).click();
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-filters-list .pnd-annotation-sidebar-filter')).then(function(elements) {
            expect(elements.length).toBe(6);
            elements[4].click();

            elements[4].findElements(protractor.By.css('.pnd-annotation-sidebar-filter-element-label')).then(function(ftr) {
                expect(ftr.length).toBe(5);
                ftr[2].click();
            });

            elements[3].click();

            elements[3].findElements(protractor.By.css('.pnd-annotation-sidebar-filter-element-label')).then(function(ftr) {
                expect(ftr.length).toBe(3);
                expect(ftr[1].getText()).toBe('cites (0)');
            });


        });

    });

    it('should be present More info in annotation object info', function() {
        p.findElements(protractor.By.css('.pnd-annotation-sidebar-container')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
        p.findElement(protractor.By.css('.pnd-toolbar-annotations-button')).click();
        p.findElement(protractor.By.css('annotation-details[id="annid125"] .pnd-item-title')).click();
        p.findElement(protractor.By.css('annotation-details[id="annid125"] .pnd-annotation-details-object .pnd-annotation-item-header-text')).click();

        p.findElements(protractor.By.css('annotation-details[id="annid125"] .pnd-annotation-details-object .pnd-sub-info .pnd-preview-bottom-links a')).then(function(elements) {
            expect(elements.length).toBe(1);
        });
    });

});