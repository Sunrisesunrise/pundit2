/*jshint -W051 */ //Only properties should be deleted

angular.module('Pundit2.Client')

.run(function($injector, Config) {
    if (Config.isValid()) {
        if (Config.isModuleActive('Client')) {
            var client = $injector.get('Client');
            client.boot();
        }
    }
})

.constant('CLIENTDEFAULTS', {

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client
     *
     * @description
     * `object`
     *
     * Configuration object for Client module. Client service has the task of managing the boot process:
     * loading the basic relationships (from "basicRelations"), downloading from the server user annotations and
     * adding to the DOM modules configured "bootModules".
     */

    /**
     * @ngdoc property
     * @name modules#Client.debug
     *
     * @description
     * `boolean`
     *
     * Active debug log
     *
     * Default value:
     * <pre> debug: false </pre>
     */
    debug: false,

    addDefaultKorbooEESelector: true,

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client.relationsContainer
     *
     * @description
     * `string`
     *
     * Name of the container used to store all of the pundit client usable relations.
     *
     * Default value:
     * <pre> relationsContainer: "usableRelations" </pre>
     */
    relationsContainer: "usableRelations",

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client.bootModules
     *
     * @description
     * `Array`
     *
     * Boot Modules name list.
     *
     * Default value:
     * <pre> bootModules: [
     *      'Toolbar', 'Dashboard', 'AnnotationSidebar',
     *      'Preview', 'VocabulariesContainer', 'PageItemsContainer',
     *      'MyItemsContainer','TripleComposer'
     * ] </pre>
     */
    bootModules: [
        'Toolbar', 'Dashboard', 'AnnotationSidebar', 'Preview',
        'MyNotebooksContainer', 'VocabulariesContainer', 'PredicatesContainer', 'PageItemsContainer', 'MyItemsContainer',
        'NotebookComposer', 'TripleComposer'
    ],

    /**
     * @module punditConfig
     * @ngdoc property
     * @name modules#Client.basicRelations
     *
     * @description
     * `Array`
     *
     * Basic Relations list, this items are loaded at boot
     * and are used as predicates in the construction of the annotations.
     * If you want to use only your predicates you can set {@link #!/api/punditConfig/object/useBasicRelations useBasicRelations} as false
     * and load your data from the {@link #!/api/punditConfig/object/vocabularies vocabularies} property.
     *
     * Default value:
     *
     * <pre>
     *  basicRelations: [
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "has comment (free text)",
     *       "description": "Any comment related to the selected fragment of text or image",
     *       "suggestedSubjectTypes": [
     *           "http://purl.org/pundit/ont/ao#fragment-image",
     *           "http://purl.org/pundit/ont/ao#fragment-text",
     *           "http://xmlns.com/foaf/0.1/Image"
     *       ],
     *       "suggestedObjectTypes": ["http://www.w3.org/2000/01/rdf-schema#Literal"],
     *       "uri": "http://schema.org/comment"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "depicts",
     *       "description": "An image or part of an image depicts something",
     *       "suggestedSubjectTypes": [
     *           "http://xmlns.com/foaf/0.1/Image",
     *           "http://purl.org/pundit/ont/ao#fragment-image"
     *       ],
     *       "suggestedObjectTypes": [],
     *       "uri": "http://xmlns.com/foaf/0.1/depicts"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "is similar to",
     *       "description": "The selected fragment (text or image fragment) is similar to another fragment (of the same or of different types)",
     *       "suggestedSubjectTypes": [
     *           "http://purl.org/pundit/ont/ao#fragment-text",
     *           "http://purl.org/pundit/ont/ao#fragment-image",
     *           "http://xmlns.com/foaf/0.1/Image"
     *       ],
     *       "suggestedObjectTypes": [
     *           "http://purl.org/pundit/ont/ao#fragment-text",
     *           "http://purl.org/pundit/ont/ao#fragment-image",
     *           "http://xmlns.com/foaf/0.1/Image"
     *       ],
     *       "uri": "http://purl.org/pundit/vocab#similarTo"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *      "label": "has creator",
     *       "description": "The selected text fragment has been created by a specific Person",
     *       "suggestedSubjectTypes": [
     *           "http://purl.org/pundit/ont/ao#fragment-text",
     *           "http://purl.org/pundit/ont/ao#fragment-image",
     *           "http://xmlns.com/foaf/0.1/Image"
     *       ],
     *       "suggestedObjectTypes": [
     *           "http://www.freebase.com/schema/people/person",
     *           "http://xmlns.com/foaf/0.1/Person",
     *           "http://dbpedia.org/ontology/Person"
     *       ],
     *       "uri": "http://purl.org/dc/terms/creator"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "cites",
     *       "description": "The selected text fragment cites another text fragment, or a Work or a Person",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": [
     *           "http://purl.org/pundit/ont/ao#fragment-text",
     *           "http://www.freebase.com/schema/people/person",
     *           "http://xmlns.com/foaf/0.1/Person",
     *           "http://dbpedia.org/ontology/Person",
     *           "http://www.freebase.com/schema/book/written_work",
     *           "http://www.freebase.com/schema/book/book"
     *       ],
     *       "uri": "http://purl.org/spar/cito/cites"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "quotes",
     *       "description": "The selected text fragment is a sentence from a Person or a Work, usually enclosed by quotations (eg: '')",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": [
     *           "http://www.freebase.com/schema/people/person",
     *           "http://xmlns.com/foaf/0.1/Person",
     *           "http://dbpedia.org/ontology/Person",
     *           "http://www.freebase.com/schema/book/written_work",
     *           "http://www.freebase.com/schema/book/book"
     *       ],
     *       "uri": "http://purl.org/spar/cito/includesQuotationFrom"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "talks about",
     *       "description": "The selected text fragment talks about some other text, Entity, Person or any other kind of concept",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": [],
     *       "uri": "http://purl.org/pundit/ont/oa#talksAbout"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "is related to",
     *       "description": "The selected text fragment is someway related to another text, Entity, Person or any other kind of concept",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": [],
     *       "uri": "http://purl.org/pundit/ont/oa#isRelatedTo"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "identifies",
     *       "description": "The selected text fragment is a Person, a Work, a Place or a well defined Entity",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": [
     *           "http://www.freebase.com/schema/location/location",
     *           "http://dbpedia.org/ontology/Place",
     *           "http://schema.org/Place",
     *           "http://www.w3.org/2003/01/geo/wgs84_pos#SpatialThing",
     *           "http://www.freebase.com/schema/people/person",
     *           "http://dbpedia.org/ontology/Person",
     *           "http://xmlns.com/foaf/0.1/Person",
     *           "http://www.freebase.com/schema/book/written_work",
     *           "http://www.freebase.com/schema/book/book"
     *       ],
     *       "uri": "http://purl.org/pundit/ont/oa#identifies"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "is date",
     *       "description": "The selected text fragment corresponds to the specified Date",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": ["http://www.w3.org/2001/XMLSchema#dateTime"],
     *       "uri": "http://purl.org/pundit/ont/oa#isDate"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "period of dates starts at",
     *       "description": "The selected text fragment corresponds to the specified date period which starts at the specified Date",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": ["http://www.w3.org/2001/XMLSchema#dateTime"],
     *       "uri": "http://purl.org/pundit/ont/oa#periodStartDate"
     *  },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "period of dates ends at",
     *       "description": "The selected text fragment corresponds to the specified date period which ends at the specified Date",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": ["http://www.w3.org/2001/XMLSchema#dateTime"],
     *       "uri": "http://purl.org/pundit/ont/oa#periodEndDate"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "translates to",
     *       "description": "The selected text fragment translation is given as free text",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": ["http://www.w3.org/2000/01/rdf-schema#Literal"],
     *       "uri": "http://purl.org/pundit/ont/oa#translatesTo"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "is translation of",
     *       "description": "The selected text fragment is the translation of another text fragment",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "uri": "http://purl.org/pundit/ont/oa#isTranslationOf"
     *   },
     *   {
     *       "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
     *       "label": "is written in",
     *       "description": "The selected text fragment is written in the specified language (french, german, english etc)",
     *       "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
     *       "suggestedObjectTypes": ["http://www.freebase.com/schema/language/human_language"],
     *       "uri": "http://purl.org/pundit/ont/oa#isWrittenIn"
     *   }
     * ]
     * </pre>
     */
    basicRelations: [{
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "has comment (free text)",
        "description": "Any comment related to the selected fragment of text or image",
        "suggestedSubjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-image",
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://xmlns.com/foaf/0.1/Image",
            "http://schema.org/WebPage"
        ],
        "suggestedObjectTypes": ["http://www.w3.org/2000/01/rdf-schema#Literal"],
        "vocabulary": "Basic Relation",
        "uri": "http://schema.org/comment"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "depicts",
        "description": "An image or part of an image depicts something",
        "suggestedSubjectTypes": [
            "http://xmlns.com/foaf/0.1/Image",
            "http://purl.org/pundit/ont/ao#fragment-image"
        ],
        "suggestedObjectTypes": [],
        "vocabulary": "Basic Relation",
        "uri": "http://xmlns.com/foaf/0.1/depicts"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "is similar to",
        "description": "The selected fragment (text or image fragment) is similar to another fragment (of the same or of different types)",
        "suggestedSubjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://purl.org/pundit/ont/ao#fragment-image",
            "http://xmlns.com/foaf/0.1/Image",
            "http://schema.org/WebPage"
        ],
        "suggestedObjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://purl.org/pundit/ont/ao#fragment-image",
            "http://xmlns.com/foaf/0.1/Image",
            "http://schema.org/WebPage"
        ],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/vocab#similarTo"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "has creator",
        "description": "The selected text fragment has been created by a specific Person",
        "suggestedSubjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://purl.org/pundit/ont/ao#fragment-image",
            "http://xmlns.com/foaf/0.1/Image",
            "http://schema.org/WebPage"
        ],
        "suggestedObjectTypes": [
            "http://www.freebase.com/schema/people/person",
            "http://xmlns.com/foaf/0.1/Person",
            "http://dbpedia.org/ontology/Person"
        ],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/dc/terms/creator"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "cites",
        "description": "The selected text fragment cites another text fragment, or a Work or a Person",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://www.freebase.com/schema/people/person",
            "http://xmlns.com/foaf/0.1/Person",
            "http://dbpedia.org/ontology/Person",
            "http://www.freebase.com/schema/book/written_work",
            "http://www.freebase.com/schema/book/book"
        ],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/spar/cito/cites"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "quotes",
        "description": "The selected text fragment is a sentence from a Person or a Work, usually enclosed by quotations (eg: '')",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": [
            "http://www.freebase.com/schema/people/person",
            "http://xmlns.com/foaf/0.1/Person",
            "http://dbpedia.org/ontology/Person",
            "http://www.freebase.com/schema/book/written_work",
            "http://www.freebase.com/schema/book/book"
        ],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/spar/cito/includesQuotationFrom"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "talks about",
        "description": "The selected text fragment talks about some other text, Entity, Person or any other kind of concept",
        "suggestedSubjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://schema.org/WebPage"
        ],
        "suggestedObjectTypes": [],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#talksAbout"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "is related to",
        "description": "The selected text fragment is someway related to another text, Entity, Person or any other kind of concept",
        "suggestedSubjectTypes": [
            "http://purl.org/pundit/ont/ao#fragment-text",
            "http://schema.org/WebPage"
        ],
        "suggestedObjectTypes": [],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#isRelatedTo"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "identifies",
        "description": "The selected text fragment is a Person, a Work, a Place or a well defined Entity",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": [
            "http://www.freebase.com/schema/location/location",
            "http://dbpedia.org/ontology/Place",
            "http://schema.org/Place",
            "http://www.w3.org/2003/01/geo/wgs84_pos#SpatialThing",
            "http://www.freebase.com/schema/people/person",
            "http://dbpedia.org/ontology/Person",
            "http://xmlns.com/foaf/0.1/Person",
            "http://www.freebase.com/schema/book/written_work",
            "http://www.freebase.com/schema/book/book"
        ],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#identifies"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "is date",
        "description": "The selected text fragment corresponds to the specified Date",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": ["http://www.w3.org/2001/XMLSchema#dateTime"],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#isDate"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "period of dates starts at",
        "description": "The selected text fragment corresponds to the specified date period which starts at the specified Date",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": ["http://www.w3.org/2001/XMLSchema#dateTime"],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#periodStartDate"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "period of dates ends at",
        "description": "The selected text fragment corresponds to the specified date period which ends at the specified Date",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": ["http://www.w3.org/2001/XMLSchema#dateTime"],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#periodEndDate"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "translates to",
        "description": "The selected text fragment translation is given as free text",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": ["http://www.w3.org/2000/01/rdf-schema#Literal"],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#translatesTo"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "is translation of",
        "description": "The selected text fragment is the translation of another text fragment",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#isTranslationOf"
    }, {
        "type": ["http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"],
        "label": "is written in",
        "description": "The selected text fragment is written in the specified language (french, german, english etc)",
        "suggestedSubjectTypes": ["http://purl.org/pundit/ont/ao#fragment-text"],
        "suggestedObjectTypes": ["http://www.freebase.com/schema/language/human_language"],
        "vocabulary": "Basic Relation",
        "uri": "http://purl.org/pundit/ont/oa#isWrittenIn"
    }]
})

// ImageAnnotator service MUST be injected before TextFragmentAnnotator
// otherwise the image consolidation may BREAK!!!
.service('Client', function(CLIENTDEFAULTS, BaseComponent, Config, EventDispatcher, Analytics, MyPundit,
    ImageAnnotator, TextFragmentAnnotator, AnnotationsCommunication,
    AnnotationsExchange, Item, ItemsExchange, MyItems, Status,
    TextFragmentHandler, ImageHandler, PageAnnotator, AnnotationSidebar, AnnotationDetails, ResizeManager,
    Toolbar, Annomatic, NotebookCommunication, NotebookExchange, TemplatesExchange,
    SelectorsManager, FreebaseSelector, MurucaSelector, KorboBasketSelector, Korbo2Selector, EuropeanaSelector, DbpediaSelector, GeonamesSelector, PredicateSelector,
    TemplatesSelector, TripleComposer, ImageFragmentAnnotatorHelper,
    $injector, $templateCache, $rootScope, $compile, $window) {

    var client = new BaseComponent('Client', CLIENTDEFAULTS),
        // Node which will contain every other component
        root;

    // Verifies that the root node has the wrap class
    var fixRootNode = function() {
        root = angular.element("[data-ng-app='Pundit2']");
        if (!root.hasClass('pnd-wrp')) {
            root.addClass('pnd-wrp');
        }
        root.append('<alert-system></alert-system>');
    };

    // Reads the list of components which needs to be bootstrapped.. and bootstrap
    // them as specified in their .options.
    // .clientDomTemplate: path to a template which will get appended to Pundit2 root node
    //                     (eg: Dashboard, Toolbar .. )
    // .clientDashboardTemplate: path to a template which will get appended to a
    //                           dashboard panel, specified in clientDashboardPanel
    //                           (eg: Preview, MyItems, ...)
    // .clientDashboardPanel: name of the panel the template will get appended to. See
    //                        Dashboard configuration for the list of legal panel names
    // .clientDashboardTabTitle: title of the tab shown inside the panel
    var addComponents = function() {
        for (var i = 0, l = client.options.bootModules.length; i < l; i++) {
            var name = client.options.bootModules[i];

            // If the module is not active, we do NOT bootstrap it
            if (!Config.isModuleActive(name)) {
                client.log("Not bootstrapping " + name + ": not active.");
                continue;
            }

            // A reference to the module we need to read .options from
            var tmpl,
                mod = $injector.get(name);

            // First case: append to Pundit2's root node
            if ("clientDomTemplate" in mod.options) {
                tmpl = $templateCache.get(mod.options.clientDomTemplate);

                if (typeof(tmpl) === "undefined") {
                    client.err('Can not bootstrap module ' + mod.name + ', template not found: ' + mod.options.clientDomTemplate);
                } else {
                    // DEBUG: Not compiling the templates, or stuff gets initialized twice
                    root.append(tmpl);
                    client.log('Appending to DOM ' + mod.name, tmpl);
                }
                continue;
            }

            // Second case: add to some Dashboard panel
            if ("clientDashboardTemplate" in mod.options &&
                "clientDashboardPanel" in mod.options &&
                "clientDashboardTabTitle" in mod.options &&
                Config.isModuleActive("Dashboard")) {

                tmpl = $templateCache.get(mod.options.clientDashboardTemplate);

                if (typeof(tmpl) === "undefined") {
                    client.err('Can not bootstrap module ' + mod.name + ', template not found: ' + mod.options.clientDashboardTemplate);
                } else {

                    $injector.get("Dashboard")
                        .addContent(
                            mod.options.clientDashboardPanel,
                            mod.options.clientDashboardTabTitle,
                            mod.options.clientDashboardTemplate
                        );
                    client.log('Adding to Dashboard: ' + mod.name + ' to panel ' + mod.options.clientDashboardPanel);
                }
                continue;
            }

            // Third case: some option is missing somewhere! Throw an error ..
            client.err("Did not bootstrap module " + name + ": .options parameters missing.");

        } // for l=client.options.bootModules.length

    }; // addComponents()

    var addKorbo = function(dir) {
        root.append(dir);
    };

    // Loads the basic relations into some special ItemsExchange container
    var loadBasicRelations = function() {
        var num = 0,
            relations = client.options.basicRelations;
        for (var p in relations) {
            // property is automatically added to ItemsExchange default container
            ItemsExchange.addItemToContainer(new Item(relations[p].uri, relations[p]), [client.options.relationsContainer, 'basicRelations']);
        }
        client.log('Loaded ' + num + ' basic relations');
    };

    // Loads configured relations into some special ItemsExchange container
    var loadConfiguredRelations = function() {
        PredicateSelector.getAllVocabularies().then(function(res) {

            for (var p in res) {
                // property is automatically added to ItemsExchange default container
                ItemsExchange.addItemToContainer(new Item(res[p].uri, res[p]), [client.options.relationsContainer, 'vocabularyRelations']);
                // if necessary override the label (vocab not override template label)
                var real = ItemsExchange.getItemByUri(res[p].uri);
                if (typeof(res[p].label) !== 'undefined' && !ItemsExchange.isItemInContainer(real, 'templateRelations')) {
                    real.label = res[p].label;
                }
            }

            client.log('Loaded ' + res.length + ' relations from extern vocabularies');
        });
    };

    var loadTemplate = function() {
        if (Config.useTemplates) {
            TemplatesSelector.getAll().then(function() {
                // show immediatly the first template
                if (Config.useOnlyTemplateMode) {
                    TripleComposer.showCurrentTemplate();
                }
            });
        }
    };

    // Called when the user completed the login process with the modal etc, NOT if the user
    // was already logged in on boot etc
    var onLogin = function() {

        NotebookExchange.wipe();
        ItemsExchange.wipe();
        AnnotationsExchange.wipe();
        TemplatesExchange.wipe();

        // There could be private annotations we want to show, get them again
        AnnotationsCommunication.getAnnotations();
        if (Config.useBasicRelations) {
            loadBasicRelations();
        }
        loadConfiguredRelations();
        loadTemplate();

        MyItems.getAllItems();

        NotebookCommunication.getMyNotebooks();
        NotebookCommunication.getCurrent();
    };

    // Called when the user completed the logout process, clicking on logout
    var onLogout = function() {

        NotebookExchange.wipe();
        ItemsExchange.wipe();
        AnnotationsExchange.wipe();
        TemplatesExchange.wipe();

        // There might have been private annotations we dont want to show anymore
        AnnotationsCommunication.getAnnotations();
        if (Config.useBasicRelations) {
            loadBasicRelations();
        }
        loadConfiguredRelations();
        loadTemplate();
    };

    var addKorboEESelector = function() {

        if (!Config.korbo.active) {
            return;
        }

        var korboEEconfig = $window[Config.korbo.confName];
        // set default language

        var lang = korboEEconfig.languages[0];
        for (var j in korboEEconfig.languages) {
            if (korboEEconfig.languages[j].state === true) {
                lang = korboEEconfig.languages[j];
                break;
            } // end if
        }
        var config = {
            container: 'korbo',
            // instance label tab title
            label: 'Korbo',
            // enable or disable the instance
            active: true,

            basketID: korboEEconfig.basketID,
            url: korboEEconfig.endpoint,
            language: lang.value
        };

        var keeSelector = new Korbo2Selector(config);
        keeSelector.push(config);
        delete keeSelector;
    };

    client.hideClient = function() {
        EventDispatcher.sendEvent('Client.hide');
        angular.element('body').css({
            'marginTop': 0
        });
        root.css('display', 'none');
        $rootScope.$$phase || $rootScope.$digest();
    };

    client.showClient = function() {
        EventDispatcher.sendEvent('Client.show');
        root.css('display', 'inherit');
        $rootScope.$$phase || $rootScope.$digest();
    };

    // Reads the conf and initializes the active components, bootstrap what needs to be
    // bootstrapped (gets annotations, check if the user is logged in, etc)
    client.boot = function() {

        fixRootNode();

        addComponents();

        if (Config.useBasicRelations) {
            loadBasicRelations();
        }
        loadConfiguredRelations();

        loadTemplate();

        if (Config.disableImageAnnotation) {
            ImageHandler.turnOff();
        }

        // Check if we're logged in, other components should $watch MyPundit
        // and get notified automatically when logged in, if needed
        MyPundit.checkLoggedIn().then(function(value) {

            if (value === true) {
                MyItems.getAllItems();
                NotebookCommunication.getMyNotebooks();
                NotebookCommunication.getCurrent();
            } else {
                EventDispatcher.sendEvent('Pundit.alert', {
                    title: 'Please log in',
                    id: "INFO",
                    timeout: 3000,
                    message: "<a href=\"javascript:void(0)\" data-inner-callback=\"0\">Log in or register</a> to Pundit to save your annotations and see your private notebooks.",
                    callbacks: [
                        function( /*alert*/ ) {
                            MyPundit.login();
                            return true;
                        }
                    ]
                });
            }

            // Now that we know if we're logged in or not, we can download the right
            // annotations: auth or non-auth form the server
            AnnotationsCommunication.getAnnotations();

            $rootScope.$watch(function() {
                return MyPundit.isUserLogged();
            }, function(newStatus, oldStatus) {
                if (newStatus === oldStatus) {
                    return;
                }
                if (newStatus === true) {
                    client.log("User just logged in");
                    onLogin();
                } else {
                    client.log("User just logged out");
                    onLogout();
                }
            });

        });

        // to add a selector must to inject it in the dependency
        // otherwise the SelectorsManager.addSelector() is never called
        // and the selector manager can't show the selector
        // es: FreebaseSelector, MurucaSelector, KorboBasketSelector

        // IF KORBO.ACTIVE IS TRUE, ADD KORBO DIRECTIVE
        if (typeof(Config.korbo) !== 'undefined' && Config.korbo.active) {
            var dir = "<korbo-entity-editor conf-name='" + Config.korbo.confName + "'></korbo-entity-editor>";
            addKorbo(dir);
        }

        if (client.options.addDefaultKorbooEESelector) {
            addKorboEESelector();
        }
        SelectorsManager.init();

        client.log('Boot is completed, emitting pundit-boot-done event');
        EventDispatcher.sendEvent('Client.boot');
        Analytics.track('main-events', 'client--endBootstrap');

        // TODO:
        // * Lists (My, page?, vocabs?, selectors?)
        // * Selectors
        // LATERS: image annotator handler, named content handler, page handler
        //         entity editor helper
        //         Notebook Manager
        //         Tool: comment tag, triple composer

    };

    // TODO: find a better place for this check? 
    client.OS = '';
    if (navigator.appVersion.indexOf("Win") !== -1) {
        client.OS = "Windows";
    } else if (navigator.appVersion.indexOf("Mac") !== -1) {
        client.OS = "MacOS";
    } else if (navigator.appVersion.indexOf("X11") !== -1) {
        client.OS = "UNIX";
    } else if (navigator.appVersion.indexOf("Linux") !== -1) {
        client.OS = "Linux";
    }

    client.log("Component up and running");

    return client;
});