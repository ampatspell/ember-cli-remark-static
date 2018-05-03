import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: [ 'nodeClassNames' ],
  layout,

  nodeClassNames: computed('node.properties.className', function() {
    let classNames = this.get('node.properties.className');
    return classNames && classNames.join(' ');
  }).readOnly()

});
