# Models

* add `ember-fetch` in deps
* always load index prior resolving page load

``` javascript
export default RemarkService.extend({

  identifier: 'markdown'

});
```

```
service
  pages // array
  content // root page
  load({ index: true, page: 'thing/foo' })
  page(id) // lookup existing
```

```
page
  id
  name
  parent
  children: []

  type: undefined / 'file' / 'directory'

  isLoaded

  // index
  headings,
  frontmatter,

  // page json
  content

  load({ index: true }) // load page and maybe index
```
