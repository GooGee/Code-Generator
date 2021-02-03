# Script

There are several scripts can be used to help generating code.

Look like this

```JavaScript
function run(data) {
    // JavaScript
    /** @type {DataForScript} */
    const ddd = data
}
```


## Notice

- function must be on the first line
- [DataForScript doc](https://googee.github.io/Code-Generator-Page/docs200/model/interfaces/dataforscript.html)
- do not change anything in `data.project`, `data.layer`, `data.entity`
- function will be called before render template
- properties of "data" will be available in template


## Execute Order

To generate code, the program will do

1. execute project script
1. execute entity script
1. execute layer script
1. render layer template


## Example

```JavaScript
function run(data) {
    /** @type {DataForScript} */
    const ddd = data

    // define variable `model`
    ddd.model = ddd.project.getLayer('Model')

    // define function `toString`
    ddd.toString = function(object) {
        return JSON.stringify(object)
    }
}
```

in template

```
{{ model.name }}

{{ toString(model) }}
```


[Data Structure](https://googee.github.io/Code-Generator-Page/docs/structure.html)

[Document](https://googee.github.io/Code-Generator-Page/docs200/model/index.html)

[Template](https://mozilla.github.io/nunjucks/templating.html)
