import Component from '@ember/component';
import layout from './template';

export const getRoot = component => {
  let parent = component;
  while(parent) {
    let next = parent.get('parent');
    if(!next) {
      return parent;
    }
    parent = next;
  }
};

export const getSettings = component => {
  let root = getRoot(component);
  return root.get('settings');
};

export const getSetting = (component, key, node) => {
  let root = getRoot(component);
  let settings = root.get('settings');
  if(!settings[key]) {
    return;
  }
  return settings[key](node, root);
};

export default Component.extend({
  classNameBindings: [ ':ui-remark-render' ],
  layout,

  content: null,
  settings: null,

}).reopenClass({
  positionalParams: [ 'content' ]
});
