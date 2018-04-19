import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: [ 'nodeClassNames' ],
  tagName: 'span',
  layout,

  nodeClassNames: computed('node.properties.className', function() {
    let classNames = this.get('node.properties.className');
    if(!classNames) {
      return;
    }
    return classNames.join(' ');
  }).readOnly()

});
