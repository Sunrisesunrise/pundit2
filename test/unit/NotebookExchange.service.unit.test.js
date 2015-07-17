/*global testNotebooks*/

describe('NotebooksExchange factory', function() {
    
    var NotebookExchange, Notebook, NameSpace, $httpBackend, MyPundit, NotebookCommunication, $timeout;
    
    beforeEach(module('Pundit2'));

    beforeEach(inject(function(_NotebookExchange_, _NotebookCommunication_, _Notebook_, _NameSpace_, _$httpBackend_, _MyPundit_, _$timeout_){
        MyPundit = _MyPundit_;
        NotebookCommunication = _NotebookCommunication_;
        NotebookExchange = _NotebookExchange_;
        Notebook = _Notebook_;
        $httpBackend = _$httpBackend_;
        NameSpace = _NameSpace_;
        $timeout = _$timeout_;
    }));

    it("should correctly add notebook by (new Notebook(id))", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId).then(function(res){
            nt = res;
        });
        $httpBackend.flush();

        var notebooks = NotebookExchange.getNotebooks();
        expect(notebooks.length).toBe(1);
        expect(notebooks[0].id).toBe(nt.id);
        expect(NotebookExchange.getNotebookById(nt.id)).toBeDefined();
    });

    it("should not duplicate existing notebook", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId).then(function(res){
            nt = res;
        });
        
        $httpBackend.flush();

        // try to duplicate notebook
        NotebookExchange.addNotebook({id: nt.id});

        var notebooks = NotebookExchange.getNotebooks();
        expect(notebooks.length).toBe(1);
    });

    it("should correctly add my notebook by (new Notebook(id, true))", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId, true).then(function(res){
            nt = res;
        });
        $httpBackend.flush();

        // default list
        var notebooks = NotebookExchange.getNotebooks();
        expect(notebooks.length).toBe(1);
        expect(notebooks[0].id).toBe(nt.id);
        expect(NotebookExchange.getNotebookById(nt.id)).toBeDefined();

        // my notebooks list
        var myNotebooks = NotebookExchange.getMyNotebooks();
        expect(myNotebooks.length).toBe(1);
        expect(myNotebooks[0].id).toBe(nt.id);
    });

    it("should correctly get and set current notebook", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId, true).then(function(res){
            nt = res;
        });
        $httpBackend.flush();

        NotebookExchange.setCurrentNotebooks(testId);
        var current = NotebookExchange.getCurrentNotebooks();

        expect(current.id).toBe(nt.id);
        expect(current.isCurrent()).toBe(true);
    });

    it("should correctly wipe notebook", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId).then(function(res){
            nt = res;
        });
        $httpBackend.flush();
        NotebookExchange.setCurrentNotebooks(testId);

        NotebookExchange.wipe();

        expect(NotebookExchange.getNotebooks().length).toBe(0);
        expect(NotebookExchange.getNotebookById(nt.id)).toBeUndefined();
        expect(NotebookExchange.getMyNotebooks().length).toBe(0);
        expect(NotebookExchange.getCurrentNotebooks()).toBeUndefined();
    });

    it("should correctly remove notebook", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId).then(function(res){
            nt = res;
        });
        $httpBackend.flush();
        
        NotebookExchange.removeNotebook(testId);
        NotebookExchange.removeNotebook('fakeID');

        expect(NotebookExchange.getNotebooks().length).toBe(0);
        expect(NotebookExchange.getNotebookById(nt.id)).toBeUndefined();
    });

    it("should correctly remove notebook from my notebooks", function(){
        var testId = 'simple1ID';
        $httpBackend
            .when('GET', NameSpace.get('asOpenNBMeta', {id: testId}))
            .respond(testNotebooks.simple1);
        var nt;
        new Notebook(testId, true).then(function(res){
            nt = res;
        });
        $httpBackend.flush();
        NotebookExchange.setCurrentNotebooks(testId);

        NotebookExchange.removeNotebook(testId);
        NotebookExchange.removeNotebook('fakeID');

        expect(NotebookExchange.getNotebooks().length).toBe(0);
        expect(NotebookExchange.getNotebookById(nt.id)).toBeUndefined();
        expect(NotebookExchange.getMyNotebooks().length).toBe(0);
        expect(NotebookExchange.getCurrentNotebooks()).toBeUndefined();
    });

    it("should correctly add notebook to NotebooksExchange even in user first login", function() {
        var notebookID = 'c10cfbc8';
        var notebookMetadata = {
            "http://purl.org/pundit/demo-cloud-server/notebook/c10cfbc8": {
                "http://purl.org/pundit/ont/ao#public": [
                    {
                        "value": "true",
                        "type": "literal",
                        "datatype": "http://www.w3.org/2001/XMLSchema#boolean"
                    }
                ],
                "http://open.vocab.org/terms/visibility": [
                    {
                        "value": "public",
                        "type": "literal"
                    }
                ],
                "http://purl.org/dc/terms/creator": [
                    {
                        "value": "http://purl.org/pundit/demo-cloud-server/user/55a8e6a21fedc",
                        "type": "uri"
                    }
                ],
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                    {
                        "value": "http://purl.org/pundit/ont/ao#Notebook",
                        "type": "uri"
                    }
                ],
                "http://purl.org/dc/terms/created": [
                    {
                        "value": "2015-07-17T07:27:32",
                        "type": "literal",
                        "datatype": "http://www.w3.org/2001/XMLSchema#dateTime"
                    }
                ],
                "http://purl.org/pundit/ont/ao#id": [
                    {
                        "value": "c10cfbc8",
                        "type": "literal"
                    }
                ],
                "http://www.w3.org/2000/01/rdf-schema#label": [
                    {
                        "value": "Notebook 2015-07-17 07:27:32",
                        "type": "literal"
                    }
                ],
                "http://purl.org/dc/elements/1.1/creator": [
                    {
                        "value": "pippo luigi",
                        "type": "literal"
                    }
                ]
            }
        };

        $httpBackend
            .when('GET', NameSpace.get('asNBOwned'))
            .respond('');

        $httpBackend
            .when('GET', NameSpace.get('asNBCurrent'))
            .respond('{"NotebookID":"'+notebookID+'"}');


        $httpBackend
            .when('GET', NameSpace.get('asNBMeta', {
                id: notebookID
            }))
            .respond(JSON.stringify(notebookMetadata));

        MyPundit.setIsUserLogged(true);

        NotebookCommunication.getMyNotebooks();
        $httpBackend.flush();

        NotebookCommunication.getCurrent();
        $httpBackend.flush();

        var currentNotebook = NotebookExchange.getCurrentNotebooks();
        expect(currentNotebook).toBeDefined();
    });

});