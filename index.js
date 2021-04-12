'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const metadata = require('./lib/metadata');

const extensions = [ 'md', 'png', 'jpg' ];

const { assign, keys } = Object;

const normalizeOptions = remark => {
  let { collections } = assign({ collections: {} }, remark);

  collections = keys(collections).reduce((hash, key) => {
    let value = collections[key];
    if(typeof value === 'string') {
      value = { path: value };
    }
    value = assign({ toc: true }, value);
    hash[key] = value;
    return hash;
  }, {});

  return {
    collections
  }
};

module.exports = {
  name: 'remark',
  isDevelopingAddon() {
    return true;
  },
  included(app, parentAddon) {
    this._super.included.apply(this, arguments);
    this.remark = normalizeOptions((parentAddon || app).options['remark']);
  },
  treeForPublic() {
    let { remark } = this;
    let trees = [];
    for(let identifier in remark.collections) {
      let hash = remark.collections[identifier];
      let dir = path.resolve(hash.path);
      let content = funnel(dir, {
        destDir: `remark/${identifier}`,
        include: [ `**/*.{${extensions.join(',')}}` ]
      });
      let { toc } = hash;
      let index = writeFile(`remark/${identifier}/metadata.json`, metadata(dir, extensions, { toc }));
      let tree = mergeTrees([ content, index ]);
      trees.push(tree);
    }
    return mergeTrees(trees);
  }
};
