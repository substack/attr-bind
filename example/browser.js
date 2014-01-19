var watch = require('observable')('');
watch(function (value) {
    console.log('value=' + value);
});

var bind = require('../')(watch);
var elems = document.querySelectorAll('*[binder]');
for (var i = 0; i < elems.length; i++) bind(elems[i]);

document.querySelector('#reset')
    .addEventListener('click', function () { watch('') })
;
