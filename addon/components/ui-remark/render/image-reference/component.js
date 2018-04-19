import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'img',

  attributeBindings: [ 'src' ],

  src: readOnly('node.identifier')

});
