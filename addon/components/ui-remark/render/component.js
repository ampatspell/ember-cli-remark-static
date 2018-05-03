import Component from './-block/component';
import { assert } from '@ember/debug';

// export const getRoot = component => {
//   let parent = component;
//   while(parent) {
//     let next = parent.get('parent');
//     if(!next) {
//       return parent;
//     }
//     parent = next;
//   }
// };

// export const getSettings = component => {
//   let root = getRoot(component);
//   return root.get('settings');
// };
//
// export const getSetting = (component, key, node) => {
//   let root = getRoot(component);
//   let settings = root.get('settings');
//   assert(`settings is required`, !!settings);
//   assert(`settings.${key} must be function`, typeof settings[key] === 'function');
//   return settings[key](node, root);
// };

export default Component.extend({
  classNameBindings: [ ':ui-remark-render' ],

  node: null,
  // settings: null,

}).reopenClass({
  positionalParams: [ 'node' ]
});
