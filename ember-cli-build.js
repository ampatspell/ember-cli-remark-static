'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const crawl = require('prember-crawler');
const defaultFingerprintExtensions = require('broccoli-asset-rev/lib/default-options').extensions;

const isFastbootEnabled = process.env.WITH_FASTBOOT === 'true';

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    remark: {
      collections: {
        'content': {
          path: 'markdown/content',
          toc: true
        }
      }
    },
    fingerprint: {
      extensions: [ ...defaultFingerprintExtensions, 'md', 'json' ],
      generateAssetMap: true
    },
    prember: {
      urls: crawl
    },
    addons: {
      blacklist: isFastbootEnabled ? [] : [ 'ember-cli-fastboot', 'prember' ]
    }
  });

  return app.toTree();
};
