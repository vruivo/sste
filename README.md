# Super Simple Template Engine

### What is it?
A simple, and synchronous, template engine aimed for server side use.

### How to use?
Load a template file into a sste object using either a string (and use the default tag markings) or an object (and define your tags) as argument,
and then pass it the values you want to populate the template with.

**Using a string argument (that uses the default tags `${` and `}`)**
```javascript
var sste = require('sste');

var tx = sste.loadTemplate(template_file);
var doc = tx.createFromTemplate( {'name':'A'} );
```

**Or an object argument**
```javascript
var sste = require('sste');

var tx = sste.loadTemplate( {
  'template': template_file,
  'tag_start': '${',
  'tag_end': '}'
});
var doc = tx.createFromTemplate( {'name':'A'} );
```

### Some examples:
* **Simple:**  

  template.txt
  ```
  Hello ${name}
  ```
  js
  ```javascript
  var sste = require('sste');

  var tx = sste.loadTemplate('template.txt');
  console.log( tx.createFromTemplate( {'name':'testing...'} ) )  // >> Hello testing...
  console.log( tx.createFromTemplate( {'name':'World!'} ) )      // >> Hello World!
  ```

* **Multiple tags:**

  template.txt
  ```
  The ${var1} ${var2} ${var3}
  ```
  js
  ```javascript
  var sste = require('sste');

  var tx = sste.loadTemplate('template.txt');

  console.log( tx.createFromTemplate({
    'var1':'quick',
    'var2':'brown',
    'var3':'fox'
  } ) );  // >> The quick brown fox

  console.log( tx.createFromTemplate({
    'var1':'magic',
    'var2':'ninja',
    'var3':'turtle'
  } ) );  // >> The magic ninja turtle
  ```

* **HTML, different tag markings, function for values:**  

  template.html
  ```
  <ul>
    %[items]
  </ul>
  ```
  js  
  ```javascript
  var sste = require('sste');

  var tx = sste.loadTemplate({
   'template':'template.html',
   'tag_start':'%[',
   'tag_end':']'
  });

  var doc = tx.createFromTemplate({
    'items': (function () {
      return '<li>One</li>\n  <li>Two</li>\n  <li>Three</li>';
    })()
  });
  console.log(doc);
  // >> <ul>
  // >>   <li>One</li>
  // >>   <li>Two</li>
  // >>   <li>Three</li>
  // >> </ul>
  ```

#### ...you can use it with anything that is text based, like JSON, XML, YAML...
