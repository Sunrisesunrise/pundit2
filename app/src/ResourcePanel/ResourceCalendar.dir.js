angular.module('Pundit2.ResourcePanel')

.directive('resourceCalendar', function(NameSpace) {
    return {
        restrict: 'E',
        scope: {
            model: '=date'
        },
        templateUrl: "src/ResourcePanel/resourceCalendar.dir.tmpl.html",
        link: function(scope, element, attrs) {

            scope.activeFocus = false;
            scope.inputDate = {
                year: '',
                month: '',
                day: '',
                time: ''
            };
            scope.mode = 'day';
            scope.focus = 'year';

            if (typeof(scope.model) === 'undefined') {
                scope.model = {};
            } else {
                if (scope.model.valid) {
                    switch (scope.model.datatype) {
                        case NameSpace.gYear:
                            scope.mode = 'year';
                            scope.focus = 'year';
                            break;
                        case NameSpace.gYearMonth:
                            scope.mode = 'month';
                            scope.focus = 'month';
                            break;
                        case NameSpace.date:
                            scope.mode = 'day';
                            scope.focus = 'day';
                            break;
                        case NameSpace.dateTime:
                            scope.mode = 'time';
                            scope.focus = 'time';
                            break;
                    }
                    scope.currentDate = moment(scope.model.value).toDate();
                }
            }


            var isValidField = function(input) {
                if (typeof(input) === 'undefined') {
                    return false;
                }
                if (input === '') {
                    return false;
                }
                if (isNaN(input)) {
                    return false;
                }

                return true;
            };

            var isValidYear = function(input) {
                if (!isValidField(input)) {
                    return false;
                }
                if (input < 1 || input > 9999) {
                    return false;
                }

                return true;
            };

            var isValidMonth = function(input) {
                if (!isValidField(input)) {
                    return false;
                }
                if (input < 1 || input > 12) {
                    return false;
                }

                return true;
            };

            var isValidDay = function(input) {
                if (!isValidField(input)) {
                    return false;
                }
                if (input < 1 || input > 31) {
                    return false;
                }

                return true;
            };

            var isValidTime = function(input) {
                var regExpTime = /^\d{1,2}:\d{2}([ap]m)?$/;

                if (typeof(input) === 'undefined') {
                    return false;
                }
                if (!input.match(regExpTime)) {
                    return false;
                }

                return true;
            };

            var updateModel = function() {
                var currentDate = scope.currentDate,
                    momentDate = moment(currentDate),
                    year = momentDate.year();
                month = momentDate.format('MM');
                day = momentDate.format('GG'),
                    time = momentDate.format('HH:mm');

                if (currentDate instanceof Date) {
                    switch (scope.mode) {
                        case 'year':
                            scope.model.datatype = NameSpace.gYear;
                            scope.model.value = year.toString();
                            break;
                        case 'month':
                            scope.model.datatype = NameSpace.gYearMonth;
                            scope.model.value = year + '-' + month;
                            break;
                        case 'day':
                            scope.model.datatype = NameSpace.date;
                            scope.model.value = year + '-' + month + '-' + day;
                            break;
                        case 'time':
                            scope.model.datatype = NameSpace.dateTime;
                            scope.model.value = year + '-' + month + '-' + day + 'T' + time + ':00';
                            break;
                    }
                    scope.model.valid = true;
                } else {
                    scope.model = {};
                    scope.model.valid = false;
                }
            };

            var updateCalendarView = function(currentDate) {
                var isValid = currentDate instanceof Date;
                if (!isValid) {
                    return;
                }

                switch (scope.mode) {
                    case 'month':
                        if (scope.focus === 'year') {
                            scope.switchFocus('month');
                        }
                        break;
                    case 'day':
                        if (scope.focus === 'year') {
                            scope.switchFocus('month');
                        } else if (scope.focus === 'month') {
                            scope.switchFocus('day')
                        }
                        break;
                    case 'time':
                        if (scope.focus === 'year') {
                            scope.switchFocus('month');
                        } else if (scope.focus === 'month') {
                            scope.switchFocus('day')
                        } else if (scope.focus === 'day') {
                            scope.switchFocus('time')
                        }
                        break;
                }

            };

            var updateInput = function(currentDate) {
                var isValid = currentDate instanceof Date;
                if (!isValid) {
                    return;
                }

                var momentDate = moment(currentDate);
                scope.inputDate = {
                    year: momentDate.year(),
                    month: momentDate.month() + 1,
                    day: momentDate.date(),
                    time: momentDate.format('HH:mm')
                };
            };

            scope.updateYear = function() {
                var currentYear = scope.inputDate.year;
                if (isValidYear(currentYear)) {
                    var dateWithNewYear = moment(scope.currentDate).year(currentYear);
                    scope.currentDate = new Date(dateWithNewYear.format());
                }
            };

            scope.updateMonth = function() {
                var currentMonth = scope.inputDate.month;
                if (isValidMonth(currentMonth)) {
                    var dateWithNewMonth = moment(scope.currentDate).month(currentMonth - 1);
                    scope.currentDate = new Date(dateWithNewMonth.format());
                }
            };

            scope.updateDay = function() {
                var currentDay = scope.inputDate.day;
                if (isValidDay(currentDay)) {
                    var dateWithNewDay = moment(scope.currentDate).date(currentDay);
                    scope.currentDate = new Date(dateWithNewDay.format());
                }
            };

            scope.updateTime = function() {
                var currentTime = scope.inputDate.time;
                if (isValidTime(currentTime)) {
                    var timeArray = scope.inputDate.time.split(':');
                    var dateWithNewTime = moment(scope.currentDate).hours(timeArray[0]).minutes(timeArray[1]);
                    scope.currentDate = new Date(dateWithNewTime.format());
                }
            };

            scope.switchFocus = function(focus) {
                scope.focus = focus;
            };

            scope.switchMode = function(mode) {
                scope.mode = mode;
                scope.focus = mode;

                updateModel();
            };

            scope.$watch('activeFocus', function() {
                updateInput(scope.currentDate);
            });

            scope.$watch('currentDate', function(value) {
                if (!scope.activeFocus) {
                    if (scope.mode !== scope.focus) {
                        updateCalendarView(value);
                    }
                    updateInput(value);
                }

                updateModel();
            });
        }
    };
});