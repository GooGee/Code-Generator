# Script

There are several scripts can be used to help generating code.

Look like this

```JavaScript
function run(data) {
    // JavaScript code
}
```

**Notice**

- function must be on the first line
- [parameter doc](https://googee.github.io/Code-Generator/docs/model/interfaces/jsparameter.html)
- do not change anything in data.project, data.layer, data.entity
- function will be called before render template
- properties of "data" will be available in template


**Run Order**

To generate code, the program will do

1. run project script
1. run entity script
1. run layer script
1. render layer template

except for validation rules, only the validation script will be ran.
