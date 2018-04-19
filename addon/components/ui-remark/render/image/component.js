import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'img',

  attributeBindings: [ 'src', 'title', 'alt' ],

  src: readOnly('node.url'),
  title: readOnly('node.title'),
  alt: readOnly('node.alt'),

});
