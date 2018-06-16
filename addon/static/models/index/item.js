import EmberObject from '@ember/object';

export default EmberObject.extend({

  type: null, // file, directory

  id: null,

  name: null,
  headings: null,
  frontmatter: null,

  parent: null,
  items: null

});
