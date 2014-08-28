module.exports = function () {
    var elements = {};
    var scope;
    
    return function (elem, key) {
        if (!scope) scope = this.scope || {};
        
        if (scope[key] !== undefined) {
            scope[key] = get(elem);
        }
        else set(elem, scope[key]);
        
        if (!elements[key]) elements[key] = [];
        elements[key].push(elem);
        
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
            if (x === scope[key]) return;
            scope[key] = x;
            
            var elems = elements[key];
            for (var i = 0; i < elems.length; i++) {
                if (elems[i] === elem) continue;
                set(elems[i], scope[key]);
            }
        }
    };
    
    function set (elem, value) {
        if (value === undefined) value = '';
        if (typeof value !== 'string') value = String(value);
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
