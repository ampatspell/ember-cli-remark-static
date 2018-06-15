import Component from '../-block/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'a',
  attributeBindings: [ 'href', 'target' ],

  href: readOnly('node.properties.href'),
  target: readOnly('node.properties.target')

});
