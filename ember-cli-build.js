'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-cli-remark-static': {
      debug: true,
      paths: {
        'markdown': 'tests/dummy/app/markdown'
      }
    }
  });

  return app.toTree();
};
