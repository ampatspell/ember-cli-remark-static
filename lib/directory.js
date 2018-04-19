module.exports = function() {

  let Funnel = require('broccoli-funnel');
  let stew = require('broccoli-stew');
  let merge = require('broccoli-merge-trees');
  let create = require('broccoli-file-creator');
  let path = require('path');
  let remark = require('./remark');

  const contentForIndex = input => {
    let children = input.children || [];
    return children.filter(node => {
      return node.type === 'heading';
    });
  };

  class Directory {

    constructor(appRoot, root, name, options) {
      this.root = path.join(appRoot, root);
      this.name = name;
      this.options = options;
    }

    toTree() {
      let { root, name, options: { debug } } = this;

      let stringify = json => JSON.stringify(json, null, debug ? 2 : 0);
      let files = [];

      let source = Funnel(root);
      let compiled = stew.map(source, '**/*.md', (string, filename) => remark(string).then(json => {
        let c = path.parse(filename);
        filename = path.join(c.dir, `${c.name}.json`);
        files.push({ filename, content: json });
        return stringify(json);
      }));

      let renamed = stew.rename(compiled, '.md', '.json');

      let index = create('_index.json', () => {
        let json = files.map(file => {
          let { filename, content } = file;
          return {
            filename,
            content: contentForIndex(content)
          }
        });
        return stringify(json);
      });

      return stew.mv(merge([ renamed, index ]), `assets/ember-cli-remark/${name}`);
    }

  }

  return Directory;
}();
