# Filters
Tree.md allows users to apply chained filtering to their repo folder structure. 

## Development
This section details adding new filters.

### Exporting Filters
Each filter exports itself by filter name. For example, regex is exported as 
```
module.exports = {
  regex: function(fileTree, options)
}
```

The name `regex` is the same as the filter name in the URL. For a user to access this filter, they'd access `${HOST}/converters/${converter}?url=whatever&filter1=regex`.

### Filter Options
Each filter can be passed options. There is no validation done on these options, they're passed straight through to the filter function.

`${HOST}/converters/${converter}?url=whatever&filter1=regex`
In this example, the `regex` filter is called with no options. This is equivalent to: 
``` javascript
regex(fileTree, {})
```

`${HOST}/converters/${converter}?url=whatever&filter1=regex&filter1param=hello`
Here, the `regex` filter is being passed `param: hello`. This would be equivalent to:
``` javascript
regex(fileTree, {param: hello})
```

Any number of parameters can be passed, though it's up to the filter function whether it actually uses that parameter.

## Examples

| Show only folders | Ignore dot files and folders | Show files/folders starting with letters | Show only folders that aren't dot folders |
|-------------------|------------------------------|------------------------------------------|-------------------------------------------|
| ![Alt text](https://tree-md.herokuapp.com/converter/svg?url=https://github.com/j-rewerts/tree.md&filter1=folder) | ![Alt text](https://tree-md.herokuapp.com/converter/svg?url=https://github.com/j-rewerts/tree.md&filter1=regex&filter1regex=%5E%5B%5E%5C.%5D.%2A) | ![Alt text](https://tree-md.herokuapp.com/converter/svg?url=https://github.com/j-rewerts/tree.md&filter1=regex&filter1regex=%5E%5Ba-zA-Z%5D.%2A) | ![Alt text](https://tree-md.herokuapp.com/converter/svg?url=https://github.com/j-rewerts/tree.md&filter1=folder&filter2=regex&filter2regex=%5E%5B%5E%5C.%5D.%2A) |
