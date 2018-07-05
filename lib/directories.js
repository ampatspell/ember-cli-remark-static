module.exports = function() {

  let merge = require('broccoli-merge-trees');
  let stew = require('broccoli-stew');
  let create = require('broccoli-file-creator');
  let path = require('path');
  let hastToString = require('hast-util-to-string');
  let Directory = require('./directory');

  const normalizeOptions = (options={}) => {
    options.paths = options.paths || {};
    return options;
  };

  const extractId = filename => {
    let { dir, name } = path.parse(filename);
    return path.join(dir, name);
  }

  const extractHeadings = input => {
    let children = input.children || [];
    return children.filter(node => {
      return node.type === 'element' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName);
    }).map(heading => {
      let level = heading.tagName.substr(1);
      let value = hastToString(heading);
      return { level, value };
    });
  }

  const extractFrontmatter = input => {
    return input.frontmatter || {};
  }

  class Directories {
    constructor(appRoot, options) {
      this.appRoot = appRoot;
      this.options = normalizeOptions(options);
      this.prepare();
    }

    createTrees() {
      let { appRoot, options: { debug, paths } } = this;
      return Object.keys(paths).map(name => new Directory(appRoot, paths[name], name, { debug }));
    }

    createContent() {
      return merge(this.trees.map(tree => tree.content));
    }

    createIndex() {
      let files = {};

      let mapped = merge(this.trees.map(tree => stew.map(tree.parsed, '**/*.json', (string, filename) => {
        let name = tree.name;
        let content = JSON.parse(string);

        let id = extractId(filename);
        let headings = extractHeadings(content);
        let frontmatter = extractFrontmatter(content);

        let arr = files[name];
        if(!arr) {
          arr = [];
          files[name] = arr;
        }

        arr.push({
          id,
          headings,
          frontmatter
        });

        return string;
      })));

      let index = create('-index.js', () => {
        let string = JSON.stringify(files, null, 2);
        return `define('ember-cli-remark-static/-index', [], function() { return { 'default': ${string} } })`;
      });

      return stew.mv(stew.find(merge([ mapped, index ]), '-index.js'), 'ember-cli-remark-static');
    }

    prepare() {
      this.trees = this.createTrees();
      this.content = this.createContent();
      this.index = this.createIndex();
    }

  }

  return Directories;
}();
