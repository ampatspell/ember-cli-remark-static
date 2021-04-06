import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { reads } from "macro-decorators";
import { toDOM } from '../util/to-dom';

const tree = (_target, key) => ({
  get() {
    return this.tree?.[key];
  }
})

export default class RemarkComponent extends Component {

  @reads('args.tree') tree;

  @tree content;
  @tree isLoading;
  @tree isError;
  @tree error;

  @tracked dom;

  constructor() {
    super(...arguments);
    this.render();
  }

  @action
  didUpdateContent() {
    this.render();
  }

  render() {
    let content = this.content;
    if(content) {
      this.dom = toDOM(content);
    }
  }

}
