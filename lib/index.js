module.exports = function() {

  let Directories = require('./directories');
  let stew = require('broccoli-stew');

  return (root, options={}) => {
    let dirs = new Directories(root, options);

    let content = dirs.content;
    let index = dirs.index;

    if(options.debug) {
      content = stew.debug(content, {
        label: 'ember-cli-remark-static-content',
        dir: 'ember-cli-remark-static-debug/content'
      });
      index = stew.debug(index, {
        label: 'ember-cli-remark-static-index',
        dir: 'ember-cli-remark-static-debug/index'
      });
    }

    return {
      content,
      index
    };
  }
}();
