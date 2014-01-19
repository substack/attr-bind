# attr-bind

2-way dom element binding

# example

``` html
<!doctype html>
<html>
  <body>
    <div>
      <label>Name:</label>
      <input type="text" binder="user-name" placeholder="Enter a name here">
      <hr>
      <h1>Hello <span binder="user-name"></span>!</h1>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

``` js
var bind = require('attr-bind')();

var elems = document.querySelectorAll('*[binder]');
for (var i = 0; i < elems.length; i++) bind(elems[i]);
```

or you can use [attractor](https://npmjs.org/package/attractor):

``` js
var bind = require('attr-bind')();
var attr = require('attractor')({ binder: bind });
attr.scan(document);
```

Now the contents of the span tag update as you edit the input box.

If you want to capture the updated values programmatically, you can pass in an
[observable](https://npmjs.org/package/observable) in place of an element:

``` js
var watch = require('observable')();
watch(function (value) {
    console.log('value=' + value);
});
bind(watch);
```

# methods

``` js
var binder = require('attr-bind')
```

## var bind = binder(fn)

Return a `bind()` function. Optionally you can pass in an
[observable()](http://npmjs.org/package/observable)-style
function watcher `fn`.

## bind(elem)

Bind the element or [observable](http://npmjs.org/package/observable) `elem`.

# install

With [npm](https://npmjs.org) do:

```
npm install attr-bind
```

# license

MIT
