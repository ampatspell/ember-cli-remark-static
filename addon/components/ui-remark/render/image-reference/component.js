import Component from '@ember/component';
import { computed } from '@ember/object';
import { getSetting } from '../component';

export default Component.extend({
  tagName: 'img',

  attributeBindings: [ 'src' ],

  src: computed('node.identifier', function() {
    let node = this.get('node');
    return getSetting(this, 'urlForImageReference', node);
  }).readOnly()

});
