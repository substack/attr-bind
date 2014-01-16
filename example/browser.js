var bind = require('../')();

var elems = document.querySelectorAll('*[binder]');
for (var i = 0; i < elems.length; i++) {
    bind(elems[i], elems[i].getAttribute('binder'));
}

var watch = require('observable')();
watch(function (value) {
    console.log('value=' + value);
});
bind(watch, 'user-name');
