import Component from '@ember/component';
import layout from './template';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'a',
  layout,

  attributeBindings: [ 'title', 'href' ],

  title: readOnly('node.title'),
  href: readOnly('node.url')

});
