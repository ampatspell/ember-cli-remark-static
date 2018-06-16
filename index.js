'use strict';

let merge = require('broccoli-merge-trees');
let remarkTree = require('./lib');

module.exports = {
  name: 'ember-cli-remark-static',
  // isDevelopingAddon() {
  //   return true;
  // },
  included() {
    this._super.included(...arguments);

    let options = this.app.options;
    options.fingerprint = options.fingerprint || {};
    let fingerprint = options.fingerprint;
    fingerprint.exclude = fingerprint.exclude || [];
    let exclude = fingerprint.exclude;

    let remark = this.app.options['ember-cli-remark-static'] || {};
    let paths = remark.paths || {};
    for(let key in paths) {
      exclude.push(`assets/ember-cli-remark-static/${key}`);
    }
  },
  treeForPublic(tree) {
    let trees = [];
    if(tree) {
      trees.push(tree);
    }

    let options = this.app.options['ember-cli-remark-static'];
    let root = this.app.project.root;

    trees.push(remarkTree(root, options));

    return merge(trees);
  }
};
