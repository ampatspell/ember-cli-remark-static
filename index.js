'use strict';

let merge = require('broccoli-merge-trees');
let remark = require('./lib');

module.exports = {
  name: require('./package').name,
  remark() {
    let instance = this._remark;
    if(!instance) {
      let options = this.app.options['ember-cli-remark-static'];
      let root = this.app.project.root;
      instance = remark(root, options);
      this._remark = instance;
    }
    return instance;
  },
  included() {
    this._super.included.apply(this, arguments);

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

    this.app.import('vendor/ember-cli-remark-static/-index.js');
  },
  treeForPublic(tree) {
    let trees = [];
    if(tree) {
      trees.push(tree);
    }

    let { content } = this.remark();
    trees.push(content);

    return merge(trees);
  },
  treeForVendor(tree) {
    let trees = [];
    if(tree) {
      trees.push(tree);
    }

    let { index } = this.remark();
    trees.push(index);

    return merge(trees);
  }
};
