angular.module('Pundit2.Core')

.service('NameSpace', function(BaseComponent, Config, $interpolate, $window) {
    var ns = new BaseComponent('NameSpace'),
        _rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        _rdfs = 'http://www.w3.org/2000/01/rdf-schema#',
        _dce = 'http://purl.org/dc/elements/1.1/',
        _dct = 'http://purl.org/dc/terms/',
        _pnd = 'http://purl.org/pundit/ont/ao#',
        _skos = 'http://www.w3.org/2004/02/skos/core#',
        _oa = 'http://www.openannotation.org/ns/',
        _img = 'http://xmlns.com/foaf/0.1/',
        _xsd = 'http://www.w3.org/2001/XMLSchema#',
        _atoka = 'http://atoka.io/ns#';

    $window.PUNDIT.ns = ns;

    ns.urlPrefix = 'http://purl.org/pundit/local/';

    // BaseURL of every Pundit-created item, fragment, predicate etc. Will be used
    // to deal with special cases like TypesHelper labels for our fragment types.
    ns.punditOntologyBaseURL = _pnd;

    ns.dce = {};

    ns.atoka = {};
    ns.atoka.hasFullAddress = _atoka + 'fullAddress';
    ns.atoka.hasAteco = _atoka + 'ateco';
    ns.atoka.hasLogo = _atoka + 'logo';

    // RDF namespace uris
    ns.rdf = {};
    ns.rdf.type = _rdf + 'type';
    ns.rdf.value = _rdf + 'value';
    ns.rdf.property = _rdf + 'Property';

    // RDFS namespace uris
    ns.rdfs = {};
    ns.rdfs.label = _rdfs + 'label';
    ns.rdfs.comment = _rdfs + 'comment';
    ns.rdfs.resource = _rdfs + 'Resource';
    ns.rdfs.literal = _rdfs + 'Literal';
    ns.rdfs.seeAlso = _rdfs + 'seeAlso';

    ns.dce.format = _dce + 'format';
    ns.dce.language = _dce + 'language';

    ns.gYear = _xsd + 'gYear';
    ns.gYearMonth = _xsd + 'gYearMonth';
    ns.date = _xsd + 'date';
    ns.dateTime = _xsd + 'dateTime';

    ns.target = {
        conformsTo: _dct + 'conformsTo',
        fragmentSelector: _oa + 'FragmentSelector',
        specificResource: _oa + 'SpecificResource',
        hasScope: _oa + 'hasScope',
        hasSource: _oa + 'hasSource',
        hasSelector: _oa + 'hasSelector',
        /* ns.rdf.type */
        /* ns.rdf.value */
        /* ns.rdfs.label */
    };

    ns.string = _xsd + 'string';

    // Item properties
    ns.item = {
        // Short label (usually 30-40 chars or so), see rdfs.label
        label: ns.rdfs.label,

        // Alternative labels
        altLabel: _skos + 'altLabel',

        // Long description or content of a text fragment
        description: _dce + 'description',

        // Image contained in the text fragment, or associated with the item
        image: _img + 'depiction',

        // TODO: the items have an rdfType field which contains the types, call
        //       this rdfTypes as well?
        // Used for item types, see rdf.type
        type: ns.rdf.type,

        // Web URL where the item has been created
        pageContext: _pnd + 'hasPageContext',

        // Closest named content or container for this item
        isPartOf: _dct + 'isPartOf',

        selector: 'http://www.w3.org/ns/openannotation/core/hasSelector',

        parentItemXP: _pnd + 'parentItemXP'
    };

    // Notebook properties
    ns.notebook = {
        // Name of the notebook
        label: ns.rdfs.label,

        // Can be public or private
        visibility: 'http://open.vocab.org/terms/visibility',

        created: _dct + 'created',

        creator: _dct + 'creator',

        // Name of the creator and owner of the notebook
        creatorName: _dce + 'creator',

        //Notebook's id
        id: _pnd + 'id',

        // Annotations this notebook includes
        includes: _pnd + 'includes',

        //Rdf type of the notebook, see rdf_type
        type: ns.rdf.type
    };

    // Notebook properties override for annotationServerVersion V2
    ns.notebookV2 = {
        visibility: _pnd + 'isPublic'
    };

    // TODO: doc
    ns.annotation = {
        creatorName: _dce + 'creator',
        created: _dct + 'created',
        creator: _dct + 'creator',
        thumbnail:  _img + 'thumbnail',
        modified: _dct + 'modified',
        pageContext: _pnd + 'hasPageContext',
        hasTarget: _oa + 'hasTarget',
        hasBody: _oa + 'hasBody',
        isIncludedIn: _pnd + 'isIncludedIn',
        motivatedBy: _oa + 'motivatedBy',
        hasTemplate: _pnd + 'hasTemplate',
        annotatedBy: _oa + 'annotatedBy',
        annotatedAt: _oa + 'annotatedAt',
        isBrokenYet: _pnd + 'isBroken',
        likes: _pnd + 'likes',
        unLikes: _pnd + 'unLikes',
        dislikes: _pnd + 'dislikes',
        unDislikes: _pnd + 'unDislikes',
        replies: _pnd + 'replies',
        disagrees: _pnd + 'disagrees',
        endorses: _pnd + 'endorses',
        reports: _pnd + 'reports',
    };

    ns.motivation = {
        linking: _oa + 'linking',
        commenting: _oa + 'commenting',
        highlighting: _oa + 'highlighting',
        // replying: _oa + 'replying'
        // tagging: _oa + 'tagging'
    };

    // TODO: move to Consolidation.options ??
    // Consolidation use this to know what items are consolidable
    ns.fragments = {
        imagePart: _pnd + 'fragment-image',
        text: _pnd + 'fragment-text'
    };

    // Notable item types: page, full image, named content
    // TODO: do we need more? Other components might want to add&read stuff here?
    ns.types = {
        page: 'http://schema.org/WebPage',
        image: _img + 'Image',
        named: _pnd + 'named-content',
        embeddedContent: _oa + 'EmbeddedContent',
        resource: _pnd + 'resource', // TODO to be defined
        atoka: _pnd + 'atoka',
        annotation: _pnd + 'annotation'
    };

    // Our types labels, will be read by the TypesHelper
    ns.typesLabels = {};
    ns.typesLabels[ns.fragments.imagePart] = 'Image fragment';
    ns.typesLabels[ns.fragments.text] = 'Text fragment';
    ns.typesLabels[ns.types.page] = 'Web page';
    ns.typesLabels[ns.types.image] = 'Image';
    ns.typesLabels[ns.types.image] = 'Resource'; // TODO to be defined
    ns.typesLabels[ns.types.named] = 'Named content';
    ns.typesLabels[ns.types.annotation] = 'Annotation';

    ns.selectors = {
        baseURI: 'http://purl.org/pundit/selector/',
        polygonType: 'http://purl.org/pundit/ont/ao#selector-polygon',
        rectangleType: 'http://purl.org/pundit/ont/ao#selector-rectangle'
    };

    ns.fragmentBaseUri = 'http://purl.org/pundit/fragment/';

    // Annotation server API
    ns.as = Config.annotationServerBaseURL;

    ns.asUsers = ns.as + 'api/users/';
    ns.asUsersCurrentSuffix = 'api/users/current';
    ns.asUsersCurrent = ns.as + ns.asUsersCurrentSuffix;
    ns.asUsersLogout = ns.as + 'api/users/logout';

    ns.asNB = ns.as + 'api/notebooks';
    ns.asNBEditMeta = ns.as + 'api/notebooks/{{id}}';
    ns.asNBOwnedSuffix = 'api/notebooks/owned';    
    ns.asNBOwned = ns.as + ns.asNBOwnedSuffix;
    ns.asNBCurrentSuffix = 'api/notebooks/current';
    ns.asNBCurrent = ns.as + ns.asNBCurrentSuffix;
    ns.asNBForcedCurrent = ns.as + 'api/notebooks/{{current}}';
    ns.asNBPrivate = ns.as + 'api/notebooks/private/{{id}}';
    ns.asNBPublic = ns.as + 'api/notebooks/public/{{id}}';
    ns.asNBMetaSuffix = 'api/notebooks/{{id}}/metadata';
    ns.asNBMeta = ns.as + ns.asNBMetaSuffix;
    ns.asOpen = ns.as + 'api/open/';
    ns.asOpenNBMetaSuffix = 'api/open/notebooks/{{id}}/metadata';
    ns.asOpenNBMeta = ns.as + ns.asOpenNBMetaSuffix;
    ns.asOpenNBAnnMeta = ns.as + 'api/open/notebooks/{{id}}/annotations/metadata';

    ns.asAnnMetaSearchSuffix = 'api/annotations/metadata/search';
    ns.asAnnMetaSearch = ns.as + ns.asAnnMetaSearchSuffix;
    ns.asOpenAnnMetaSearchSuffix = 'api/open/metadata/search';
    ns.asOpenAnnMetaSearch = ns.as + ns.asOpenAnnMetaSearchSuffix;
    ns.asAnnMultSuffix = 'api/annotations/multiple';
    ns.asAnnMult = ns.as + ns.asAnnMultSuffix;
    ns.asOpenAnnMultSuffix = 'api/open/annotations/multiple';
    ns.asOpenAnnMult = ns.as + ns.asOpenAnnMultSuffix;
    ns.asAnn = ns.as + 'api/annotations/{{id}}';
    ns.asOpenAnn = ns.as + 'api/open/annotations/{{id}}';
    ns.asAnnContent = ns.as + 'api/annotations/{{id}}/content';
    ns.asAnnItems = ns.as + 'api/annotations/{{id}}/items';
    ns.asAnnBroken = ns.as + 'api/annotations/broken';

    ns.asReply = ns.as + 'api/annotations/{{id}}/reply';
    ns.asUpdateReply = ns.as + 'api/annotations/{{id}}/updateReply';
    ns.asAnnRepliesOpen = ns.as + 'api/open/annotations/{{id}}/replies';
    ns.asAnnReplies = ns.as + 'api/annotations/{{id}}/replies';
    ns.asLike = ns.as + 'api/annotations/{{id}}/like';
    ns.asUnLike = ns.as + 'api/annotations/{{id}}/unLike';
    ns.asDislike = ns.as + 'api/annotations/{{id}}/dislike';
    ns.asUnDislike = ns.as + 'api/annotations/{{id}}/unDislike';
    ns.asEndorse = ns.as + 'api/annotations/{{id}}/endorse';
    ns.asUnEndorse = ns.as + 'api/annotations/{{id}}/unEndorse';
    ns.asReport = ns.as + 'api/annotations/{{id}}/report';
    ns.asUnReport = ns.as + 'api/annotations/{{id}}/unReport';

    ns.asPref = ns.as + 'api/services/preferences/{{key}}';
    ns.asUrlPrefix = ns.as + 'api/open/urlprefix';

    // Gets a key of thelike namespace, interpolating variables if needed
    ns.get = function(key, context) {

        // If it's not a string, it's nothing we can return (this
        // blocks the user from asking options or other weird stuff)
        if (typeof(ns[key]) !== 'string') {
            ns.err('get() cant find key ' + key);
            return;
        }

        // No context, use an empty one
        if (typeof(context) === 'undefined') {
            context = {};
        }

        // Count how many variables are needed to interpolate this string
        var str = ns[key],
            variables = str.match(/{{([a-zA-Z0-9]*)}}/g),
            foo;

        if (variables !== null && variables.length > 0) {
            var contextVariables = 0;
            for (foo in context) {
                contextVariables++;
            }
            if (variables.length > contextVariables) {
                ns.err('Context variables mismatch! Expecting ' + variables.join(', ') + ' instead got ' + JSON.stringify(context));
                return;
            }
        }

        return $interpolate(str)(context);
    };

    ns.log('NameSpace up and running');
    return ns;
});
