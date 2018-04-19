import Component from '@ember/component';
import { computed } from '@ember/object';
import { getSetting } from '../component';

export default Component.extend({
  tagName: 'img',

  attributeBindings: [ 'src' ],

  src: computed('node.identifier', function() {
    let node = this.get('node');
    let url = getSetting(this, 'urlForImageReference', node);
    return url || url.get('identifier');
  }).readOnly()

});
