import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'pre',
  layout,

  codeClassNames: computed('node.data.hProperties.className', function() {
    let classNames = this.get('node.data.hProperties.className');
    if(!classNames) {
      return;
    }
    return classNames.join(' ');
  }).readOnly(),

});
