ddescribe('Keyboard service', function() {

    var Keyboard,
        state,
        $rootScope,
        $log;

    beforeEach(module('Pundit2'));

    beforeEach(inject(function($injector, _$rootScope_, _Keyboard_, _$log_){
        Keyboard = $injector.get('Keyboard');
        state = Keyboard.getState();
        $rootScope = _$rootScope_;
        $log = _$log_;
    }));

    it('should expose expected API', function(){
        expect(Keyboard.registerHandler).toBeDefined();
        expect(Keyboard.unregisterHandler).toBeDefined();
        expect(Keyboard.unregisterAllHandlers).toBeDefined();
        expect(Keyboard.getState).toBeDefined();
        expect(Keyboard.eventToString).toBeDefined();
    });

    it('should not add handler by invalid event config object or invalid callback', function() {
        var invalidEventObject = {};

        Keyboard.registerHandler('test', invalidEventObject, function(){/*do nothing*/});
        expect($log.error.logs.length).toBe(1);
        $log.reset();

        var validEventObjectConfig = {
            keyCode: 70
        };
        Keyboard.registerHandler('test', validEventObjectConfig);
        expect($log.error.logs.length).toBe(1);
        $log.reset();
    });

    it('should correctly add handler', function() {
        var validEventObjectConfig = {
            ctrlKey: true,
            keyCode: 70
        };

        Keyboard.registerHandler('test', validEventObjectConfig, function(){/*do nothing*/});

        expect(state.keyHandlers['aCms70'].length).toBe(1);

    });

    it('should correctly remove all handlers', function() {
        var eventConfigObjects = [
            {
                ctrlKey: true,
                keyCode: 70
            },
            {
                keyCode: 27
            },
            {
                keyCode: 13
            }
        ];

        for (var i in eventConfigObjects) {
            Keyboard.registerHandler('test', eventConfigObjects[i], function(){/*do nothing*/});
        }

        var totHandlers = 0;
        for (var i in state.keyHandlers) {
            if (state.keyHandlers.hasOwnProperty(i)) {
                totHandlers += state.keyHandlers[i].length;
            }
        }
        expect(totHandlers).toBe(3);

        Keyboard.unregisterAllHandlers();

        totHandlers = 0;
        for (var i in state.keyHandlers) {
            if (state.keyHandlers.hasOwnProperty(i)) {
                totHandlers += state.keyHandlers[i].length;
            }
        }
        expect(totHandlers).toBe(0);
    });

});