import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'img',
  attributeBindings: [ 'alt', 'src' ],

  alt: readOnly('node.properties.alt'),
  src: readOnly('node.properties.src'),

});
