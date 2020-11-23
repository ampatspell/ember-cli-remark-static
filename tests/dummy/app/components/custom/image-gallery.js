import Element from 'ember-cli-remark-static/components/remark/render/element';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CustomImageGalleryComponent extends Element {

  @tracked
  count = 0

  @action
  onClick() {
    this.count++;
  }

  toString() {
    return `<${this.constructor.name}>`;
  }

}
