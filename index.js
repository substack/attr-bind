module.exports = function (cb) {
    var elements = [];
    var value;
    if (cb) {
        elements.push(cb);
        value = cb();
        cb(function (v) {
            value = v;
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] === cb) continue;
                set(elements[i], value);
            }
        });
    }
    
    return function (elem) {
        if (value !== undefined) {
            value = get(elem);
        }
        else set(elem, value);
        
        elements.push(elem);
        
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
            if (x === value) return;
            value = x;
            
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] === elem) continue;
                set(elements[i], value);
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
