import Component from '@ember/component';
import layout from './template';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

const componentRoot = 'ui-remark/render';

const addComponentName = child => {
  let name = child._uiRemarkComponentName;
  if(name) {
    return;
  }
  let type = dasherize(child.type);
  if(type === 'heading') {
    name = `heading-${child.depth}`;
  } else {
    name = child.type;
  }
  child._uiRemarkComponentName = `${componentRoot}/${name}`;
};

export default Component.extend({
  tagName: '',
  layout,

  augmentedChildren: computed('children', function() {
    let children = A(this.get('children'));
    children.forEach(child => {
      addComponentName(child);
    });
    return children;
  }).readOnly()

});
