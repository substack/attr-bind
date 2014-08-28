var observ = require('observ');

module.exports = function () {
    var elements = {};
    var values = {};
    var scope;
    
    return function (elem, key) {
        if (!scope) scope = this.scope || {};
        
        if (!elements[key]) elements[key] = [];
        elements[key].push(elem);
        
        if (has(scope, key) && typeof scope[key] !== 'function') {
            throw new Error('scope at key: ' + key + ' is not a function');
        }
        else if (has(scope, key)) {
            values[key] = scope[key]();
        }
        else {
            scope[key] = observ(get(elem));
        }
        scope[key](function (value) {
            set(elem, value);
        });
        elements[key].push(scope[key]);
        
        if (typeof elem === 'function') {
            elem(onchange);
        }
        else {
            elem.addEventListener('change', onchange);
            elem.addEventListener('keydown', onchange);
            elem.addEventListener('keyup', onchange);
        }
        
        function onchange () {
            var x = get(elem);
            if (x === values[key]) return;
            values[key] = x;
            
            var elems = elements[key];
            for (var i = 0; i < elems.length; i++) {
                if (elems[i] === elem) continue;
                set(elems[i], values[key]);
            }
        }
    };
    
    function set (elem, value) {
        if (value === undefined) value = '';
        if (typeof value !== 'string') value = String(value);
        if (elem && typeof elem.set === 'function') {
            return elem.set(value);
        }
        if (typeof elem === 'function') return elem(value);
        
        if (elem.value !== undefined) {
            elem.value = value;
        }
        else if (elem.textContent !== undefined) {
            elem.textContent = value;
        }
        else if (elem.innerText !== undefined) {
            elem.innerText = value;
        }
        else {
            var txt = document.createTextNode(value);
            elem.innerHTML = '';
            elem.appendChild(txt);
        }
    }
    
    function get (elem) {
        if (typeof elem === 'function') return elem();
        
        if (elem.value !== undefined) return elem.value;
        if (editable(elem)) return elem.value;
        return elem.textContent || elem.innerText;
    }
    
    function editable (elem) {
        if (typeof elem === 'function') return false;
        if (!elem || !elem.tagName) return false;
        var tag = elem.tagName.toUpperCase();
        return tag === 'INPUT' || tag === 'TEXTAREA';
    }
};

function has (obj, key) { return {}.hasOwnProperty.call(obj, key) }
