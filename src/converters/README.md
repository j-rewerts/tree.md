# Tree.md Converters

## Adding New Types

`/converters/{TYPE}?url={GIT_URL}`

Tree.md automatically creates endpoints for new types, so long as a few rules are followed. First, when creating a new tree type, it must be in its own folder within this `converters` folder. The name of the folder will be the previously mentioned `{TYPE}`. The other part is the `index.js` file. As an example, here is the SVG converters index file:

``` js
module.exports = {
  type: 'image/svg+xml',
  converter: require('./svg')
}
```

In this file, type is the HTTP Content Type.

## Types
This section describes different converter types. 

### Text
URL: `/converter/text`
Content-Type: `text/plain`

### SVG
URL: `/converter/svg`
Content-Type: `image/svg+xml`