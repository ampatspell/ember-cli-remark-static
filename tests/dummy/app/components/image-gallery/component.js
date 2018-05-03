import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':image-gallery' ],
  layout,

  count: 0,

  click() {
    this.incrementProperty('count');
  }
  
});
