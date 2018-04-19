'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-cli-remark': {
      debug: true,
      paths: {
        'markdown': 'tests/dummy/app/markdown'
      }
    },
    fingerprint: {
      exclude: [ 'assets/ember-cli-remark' ]
    }
  });

  return app.toTree();
};
