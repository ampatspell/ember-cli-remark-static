module.exports = function() {

  let Funnel = require('broccoli-funnel');
  let stew = require('broccoli-stew');
  let merge = require('broccoli-merge-trees');
  let path = require('path');
  let remark = require('./remark');

  class Directory {

    constructor(appRoot, root, name, options) {
      this.root = path.join(appRoot, root);
      this.name = name;
      this.options = options;
      this.prepare();
    }

    stringify(json) {
      let { options: { debug } } = this;
      return JSON.stringify(json, null, debug ? 2 : 0);
    }

    createSource() {
      let { root } = this;
      return Funnel(root);
    }

    createOther() {
      let source = this.source;
      return stew.find(source, { exclude: [ '**/*.md' ] });
    }

    createParsed() {
      let source = this.source;
      let markdown = stew.find(source, '**/*.md');
      let compiled = stew.map(markdown, string => remark(string).then(content => this.stringify(content)));
      return stew.rename(compiled, '.md', '.json');
    }

    createContent() {
      let { name } = this;
      let renamed = this.parsed;
      let other = this.other;
      return stew.mv(merge([ renamed, other ]), `assets/ember-cli-remark-static/${name}`);
    }

    prepare() {
      this.source = this.createSource();
      this.other = this.createOther();
      this.parsed = this.createParsed();
      this.content = this.createContent();
    }

  }

  return Directory;
}();
