import Component from '../-block/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({

  node: null,
  parent: null,

  root: readOnly('parent.root')

});
