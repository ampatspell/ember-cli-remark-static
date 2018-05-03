import Component from './-block/component';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { dasherize } from '@ember/string';

const componentName = child => {
  let type = child.type;
  if(type === 'element') {
    name = child.tagName;
  } else {
    name = type;
  }
  return `ui-remark/render/${name}`;
};

export default Component.extend({
  classNameBindings: [ ':ui-remark-render' ],

  root: computed(function() {
    return this;
  }).readOnly(),

  node: null,
  settings: null,

  preprocessChild(node, child, settings) {
    if(child.__preprocessed) {
      return;
    }
    child.componentName = componentName(child);
    if(settings) {
      settings.preprocessNode(node, child);
    }
    child.__preprocessed = true;
  },

  preprocessChildren(node) {
    let children = A(node.children);
    let settings = this.get('settings');
    children.forEach(child => this.preprocessChild(node, child, settings));
  }

}).reopenClass({
  positionalParams: [ 'node' ]
});
