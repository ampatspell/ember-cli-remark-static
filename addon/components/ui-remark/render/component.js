import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-remark-render' ],
  layout,

  content: null

}).reopenClass({
  positionalParams: [ 'content' ]
});
