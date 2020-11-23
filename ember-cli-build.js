'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const crawl = require('prember-crawler');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-cli-remark-static': {
      debug: false,
      paths: {
        'markdown': 'tests/dummy/app/markdown'
      }
    },
    prember: {
      urls: crawl
    }
  });

  return app.toTree();
};
