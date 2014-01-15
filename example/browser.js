var bind = require('../')();

var elems = document.querySelectorAll('*[binder]');
for (var i = 0; i < elems.length; i++) {
    bind(elems[i], 'binder');
}
