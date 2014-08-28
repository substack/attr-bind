var observ = require('observ');
var bind = require('../')();

var scope = { 'user-name': observ() };
scope['user-name'](function (value) {
    console.log('value=', value);
});
window.scope = scope;

var elems = document.querySelectorAll('*[binder]');
for (var i = 0; i < elems.length; i++) {
    var key = elems[i].getAttribute('binder');
    bind.call({ scope: scope }, elems[i], key);
}

document.querySelector('#reset')
    .addEventListener('click', function () { watch('') })
;
