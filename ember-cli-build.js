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

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
