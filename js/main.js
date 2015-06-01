$(function () {
    // on mobile - open/close primary navigation clicking/tapping the menu icon
    $(".pundit-mobile-menu-toggle").on('click', function (event) {
        if ($(event.target).is('.pundit-mobile-menu-toggle')) {
            $("#main-menu").toggleClass('is-visible');
        }
    });
});