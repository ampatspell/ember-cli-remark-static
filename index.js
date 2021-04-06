'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const metadata = require('./lib/metadata');

const extensions = [ 'md', 'png', 'jpg' ];

const defaults = {
  collections: {}
};

module.exports = {
  name: 'remark',
  isDevelopingAddon() {
    return true;
  },
  included(app, parentAddon) {
    this._super.included.apply(this, arguments);
    this.remark = Object.assign({}, defaults, (parentAddon || app).options['remark']);
  },
  treeForPublic() {
    let { remark } = this;
    let trees = [];
    for(let identifier in remark.collections) {
      let dir = path.resolve(remark.collections[identifier]);
      let content = funnel(dir, {
        destDir: `remark/${identifier}`,
        include: [ `**/*.{${extensions.join(',')}}` ]
      });
      let index = writeFile(`remark/${identifier}/metadata.json`, metadata(dir, extensions));
      let tree = mergeTrees([ content, index ]);
      trees.push(tree);
    }
    return mergeTrees(trees);
  }
};
