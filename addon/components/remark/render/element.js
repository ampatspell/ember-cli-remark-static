import Component from '@glimmer/component';

export default class RemarkRenderElementComponent extends Component {

  get classNames() {
    let { args: { node } } = this;
    if(node) {
      let { properties } = node;
      if(properties) {
        let { className } = properties;
        if(className) {
          return className.join(' ');
        }
      }
    }
    return undefined;
  }

}
