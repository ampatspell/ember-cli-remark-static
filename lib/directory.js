module.exports = function() {

  let Funnel = require('broccoli-funnel');
  let stew = require('broccoli-stew');
  let merge = require('broccoli-merge-trees');
  let create = require('broccoli-file-creator');
  let hastToString = require('hast-util-to-string');
  let path = require('path');
  let remark = require('./remark');

  class Directory {

    constructor(appRoot, root, name, options) {
      this.root = path.join(appRoot, root);
      this.name = name;
      this.options = options;
    }

    filenameToId(filename) {
      let parsed = path.parse(filename);
      return path.join(parsed.dir, parsed.name);
    }

    extractHeadings(input) {
      let children = input.children || [];
      return children.filter(node => {
        return node.type === 'element' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName);
      }).map(heading => {
        let level = heading.tagName.substr(1);
        let value = hastToString(heading);
        return { level, value };
      });
    }

    toTree() {
      let { root, name, options: { debug } } = this;

      let stringify = json => JSON.stringify(json, null, debug ? 2 : 0);
      let files = [];

      let source = Funnel(root);
      let compiled = stew.map(source, '**/*.md', (string, filename) => remark(string).then(content => {
        files.push({ filename, content });
        return stringify(content);
      }));

      let renamed = stew.rename(compiled, '.md', '.json');

      let index = create('_index.json', () => {
        let json = files.map(file => {
          let { filename, content } = file;
          let id = this.filenameToId(filename);
          let headings = this.extractHeadings(content);
          let frontmatter = content.frontmatter;
          return { id, headings, frontmatter };
        });
        return stringify(json);
      });

      let other = stew.find(source, '**/*.!md');

      return stew.mv(merge([ renamed, other, index ]), `assets/ember-cli-remark-static/${name}`);
    }

  }

  return Directory;
}();
