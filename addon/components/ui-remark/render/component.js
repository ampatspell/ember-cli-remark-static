import Component from './-block/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';

const componentName = child => {
  let type = child.type;
  let name;
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

  node: readOnly('page.content'),
  settings: readOnly('page'),
  page: null,

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
    if(!node) {
      return;
    }
    let children = A(node.children);
    let settings = this.get('settings');
    children.forEach(child => this.preprocessChild(node, child, settings));
  }

}).reopenClass({
  positionalParams: [ 'node' ]
});
