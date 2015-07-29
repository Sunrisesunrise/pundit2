var bodyStyle = document.body.style;
var cssTransform = 'transform' in bodyStyle ? 'transform' : 'webkitTransform';

var b = document.getElementsByTagName('body')[0],
    div = document.createElement('div');

bodyStyle[cssTransform] = 'translateY(' + 30 + ')';

if (document.getElementById('pundit2') === null) {
    div.setAttribute('data-ng-app', "Pundit2");
    div.setAttribute('id', "pundit2");
    b.appendChild(div);
}