describe("AlertSystem", function(){

    var AlertSystem,
        $rootScope,
        $compile,
        $timeout;

    beforeEach(module('Pundit2'));

    beforeEach(module(
    ));

    beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_, _AlertSystem_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $timeout = _$timeout_;
        AlertSystem = _AlertSystem_;
    }));

    /*var compileDirective = function(){
        var elem = $compile('<page-item-container></page-item-container>')($rootScope);
        angular.element('body').append(elem);
        $rootScope.$digest();
        return elem;
    };*/

    /*afterEach(function(){
        angular.element('page-item-container').remove();
    });*/

    it('should correctly initialize', function(){
        expect(AlertSystem.AlertType).toBeDefined();
        expect(AlertSystem.addAlert).toBeDefined();
        expect(AlertSystem.clearAlert).toBeDefined();
        expect(AlertSystem.clearAlerts).toBeDefined();
        expect(AlertSystem.removeTimeout).toBeDefined();
        expect(AlertSystem.resetTimeout).toBeDefined();
        expect(AlertSystem.alerts).toBeDefined();
        expect(AlertSystem.alerts.length).toBe(0);
    });

    it('should correctly insert and delete alerts', function(){
        expect(AlertSystem.alerts.length).toBe(0);
        AlertSystem.addAlert(AlertSystem.AlertType.OK, 'ok msg');
        expect(AlertSystem.alerts.length).toBe(1);
        AlertSystem.addAlert(AlertSystem.AlertType.ERROR, 'error msg');
        expect(AlertSystem.alerts.length).toBe(2);
        AlertSystem.addAlert(AlertSystem.AlertType.ALERT, 'alert msg');
        expect(AlertSystem.alerts.length).toBe(3);
        AlertSystem.addAlert(AlertSystem.AlertType.CUSTOM, 'custom msg');
        expect(AlertSystem.alerts.length).toBe(4);
        AlertSystem.clearAlert(1);
        expect(AlertSystem.alerts.length).toBe(3);
        AlertSystem.clearAlerts();
        expect(AlertSystem.alerts.length).toBe(0);
    });

    it('timeout should works correctly', function(){
        expect(AlertSystem.alerts.length).toBe(0);
        //ERROR message dos not auto dismiss
        AlertSystem.addAlert(AlertSystem.AlertType.ERROR, 'error msg');
        expect(AlertSystem.alerts.length).toBe(1);
        //CUSTOM message which auto-dismiss
        AlertSystem.addAlert(AlertSystem.AlertType.CUSTOM, 'timeout msg', 500);
        expect(AlertSystem.alerts.length).toBe(2);
        $timeout.flush();
        expect(AlertSystem.alerts.length).toBe(1);
        //CUSTOM message which does auto-dismiss
        AlertSystem.addAlert(AlertSystem.AlertType.CUSTOM, 'custom msg');
        expect(AlertSystem.alerts.length).toBe(2);
        //OK message which does auto-dismiss
        AlertSystem.addAlert(AlertSystem.AlertType.OK, 'ok msg');
        expect(AlertSystem.alerts.length).toBe(3);
        $timeout.flush();
        expect(AlertSystem.alerts.length).toBe(2);

    });

});