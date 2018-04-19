module.exports = function() {

  let Funnel = require('broccoli-funnel');
  let stew = require('broccoli-stew');
  let merge = require('broccoli-merge-trees');
  let create = require('broccoli-file-creator');
  let path = require('path');
  let remark = require('./remark');

  class Directory {

    constructor(appRoot, root, name) {
      console.log('•', appRoot, root, name);
      this.root = path.join(appRoot, root);
      this.name = name;
    }

    toTree() {
      let { root, name } = this;
      let source = Funnel(root);
      let compiled = stew.map(source, '**/*.md', string => remark(string).then(json => JSON.stringify(json, null, 2)));
      let renamed = stew.rename(compiled, '.md', '.json');
      let index = create('_index.json', JSON.stringify({ ok: true }, null, 2));
      return stew.mv(merge([ renamed, index ]), `assets/ember-cli-remark/${name}`);
    }

  }

  return Directory;
}();
