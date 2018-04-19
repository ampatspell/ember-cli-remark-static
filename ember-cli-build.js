'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-cli-remark': {
      paths: {
        'content': 'app/content',
        'markdown': 'app/markdown'
      }
    }
  });

  return app.toTree();
};
