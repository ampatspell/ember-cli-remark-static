'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    remark: {
      collections: {
        'content': 'markdown/content'
      }
    }
  });

  return app.toTree();
};
