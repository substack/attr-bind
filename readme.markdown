# attr-bind

2-way dom element binding

# example

``` html
<!doctype html>
<html>
  <body>
    <div>
      <label>Name:</label>
      <input type="text" binder="yourName" placeholder="Enter a name here">
      <hr>
      <h1>Hello <span binder="yourName"></span>!</h1>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

```javascript
var bind = require('attr-bind')();

var elems = document.querySelectorAll('*[binder]');
for (var i = 0; i < elems.length; i++) {
    bind(elems[i], elem.properties.binder.value);
}
```

Now the contents of the span tag update as you edit the input box.

# methods

``` js
var binder = require('attr-bind')
```

## var bind = binder(mappings)

Return a `bind()`

## bind(elem, attrName)

Bind the element `elem` into the group named by the attribute `attrName`.

# install

With [npm](https://npmjs.org) do:

```
npm install -g attr-bind
```

# license

MIT
