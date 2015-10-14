/*global moment*/

angular.module('Pundit2.ResourcePanel')

.directive('resourceCalendar', function(NameSpace) {
    return {
        restrict: 'E',
        scope: {
            model: '=date'
        },
        templateUrl: "src/ResourcePanel/resourceCalendar.dir.tmpl.html",
        link: function(scope) {

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
                    console.log('scope.currentDate',scope.currentDate);
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
                if(input[0]=='-'){
                    if(input.length!=1){
                        if(!isValidField(input.substring(1, input.length))) {
                            return false
                        }
                    }
                }
                else if (!isValidField(input)) {
                    return false;
                }
                if (-9999 > input || input > 9999) {
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
                // TODO: add support to BC date for time???????

                var regExpTime = /^\d{1,2}:\d{2}([ap]m)?$/;

                if (typeof(input) === 'undefined') {
                    return false;
                }
                if (!input.match(regExpTime)) {
                    return false;
                }

                return true;
            };

            var normalizeYear = function(year) {
                year = typeof year !== 'string' ? year.toString() : year;

                if(year[0]=='-'){
                    var yearTemp=year.substring(1, year.length);
                    while (yearTemp.length < 6) {
                        yearTemp = '0' + yearTemp;
                    }
                    year='-'+yearTemp;

                }else {
                    while (year.length < 4) {
                        year = '0' + year;
                    }
                }
                return year;
            };
            var updateModel = function() {
                var currentDate = scope.currentDate,
                    momentDate = moment(currentDate),
                    year = normalizeYear(momentDate.year()),
                    month = momentDate.format('MM'),
                    day = momentDate.format('DD'),
                    time = momentDate.format('HH:mm');
                console.log('current date inside updatemodel',currentDate);
                console.log('moment of current date inside updatemodel',momentDate);

                console.log('inputDate date inside updatemodel',scope.inputDate);

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
                            scope.switchFocus('day');
                        }
                        break;
                    case 'time':
                        if (scope.focus === 'year') {
                            scope.switchFocus('month');
                        } else if (scope.focus === 'month') {
                            scope.switchFocus('day');
                        } else if (scope.focus === 'day') {
                            scope.switchFocus('time');
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

            var setBcDate = function() {
                var currentYear = scope.inputDate.year;
                var dateWithNewField = moment(scope.currentDate);
                var date = new Date();

                date.setYear(normalizeYear(currentYear));
                date.setMonth(dateWithNewField.format('MM'));
                date.setDate(dateWithNewField.format('DD'));
                date.setHours(dateWithNewField.format('HH'));
                date.setMinutes(dateWithNewField.format('mm'));
                scope.currentDate = date;


            }
            scope.updateYear = function() {
                var currentYear = scope.inputDate.year;

                if (isValidYear(currentYear)) {
                    if(currentYear>0){
                        var dateWithNewYear = moment(scope.currentDate).year(currentYear);
                        scope.currentDate = new Date(dateWithNewYear.format());
                    }
                    else {
                        setBcDate();
                    }
                }else {
                    scope.inputDate.year = currentYear.substring(0, currentYear.length - 1);
                    if(!isValidYear(scope.inputDate.year)){
                        scope.inputDate.year ='';
                    }
                }
            };

            scope.updateMonth = function() {
                var currentMonth = scope.inputDate.month;
                var currentYear = scope.inputDate.year;

                if (isValidMonth(currentMonth)) {
                    if (currentYear > 0) {
                        var dateWithNewYear = moment(scope.currentDate).year(currentYear);
                        scope.currentDate = new Date(dateWithNewYear.format());
                    }else {
                        setBcDate();
                    }
                }else {
                    scope.inputDate.month = currentMonth.substring(0, currentMonth.length - 1);
                }
            };

            scope.updateDay = function() {
                var currentDay = scope.inputDate.day;
                var currentYear = scope.inputDate.year;

                if (isValidDay(currentDay)) {
                    if (currentYear > 0) {
                        var dateWithNewDay = moment(scope.currentDate).date(currentDay);
                        scope.currentDate = new Date(dateWithNewDay.format());
                    }else {
                        setBcDate();
                    }
                }else{
                    scope.inputDate.day = currentDay.substring(0, currentDay.length - 1);
                }
            };

            scope.updateTime = function() {
                var currentTime = scope.inputDate.time;
                var regExpLetters = /[A-Za-z]/; // TODO check all non digit and : only 
                var matchIndex, currentChar;

                while (currentTime.match(regExpLetters)) {
                    matchIndex = currentTime.match(regExpLetters).index;
                    currentChar = currentTime.charAt(matchIndex);
                    currentTime = scope.inputDate.time = currentTime.replace(currentChar, '');
                }

                if (isValidTime(currentTime)) {
                    var timeArray = scope.inputDate.time.split(':');
                    var dateWithNewTime = moment(scope.currentDate).hours(timeArray[0]).minutes(timeArray[1]);
                    scope.currentDate = new Date(dateWithNewTime.format());
                }
            };

            scope.switchFocus = function(focus) {
                if (scope.focus === focus) {
                    return;
                }
                scope.focus = focus;
            };

            scope.switchMode = function(mode) {
                if (scope.mode === mode) {
                    return;
                }

                scope.mode = mode;

                switch (mode) {
                    case 'month':
                        if (scope.inputDate.year === '') {
                            scope.focus = 'year';
                        } else {
                            scope.focus = 'month';
                        }
                        break;
                    case 'day':
                        if (scope.inputDate.year === '') {
                            scope.focus = 'year';
                        } else if (scope.inputDate.month === '') {
                            scope.focus = 'month';
                        } else {
                            scope.focus = 'day';
                        }
                        break;
                    case 'time':
                        if (scope.inputDate.year === '') {
                            scope.focus = 'year';
                        } else if (scope.inputDate.month === '') {
                            scope.focus = 'month';
                        } else if (scope.inputDate.day === '') {
                            scope.focus = 'day';
                        } else {
                            scope.focus = 'time';
                        }
                        break;
                    default:
                        scope.focus = mode;
                }
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