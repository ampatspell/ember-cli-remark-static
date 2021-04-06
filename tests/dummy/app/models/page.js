import { setOwner } from '@ember/application';
import { remark } from 'remark/util/remark';
import { reads } from "macro-decorators";

export default class Page {

  constructor(owner, { file }) {
    setOwner(this, owner);
    this.file = file;
  }

  @reads('file.body') body;

  @remark('body')
  tree(node) {
    if(node.tagName === 'a') {
      let { properties: { href } } = node;
      if(href.startsWith('http:') || href.startsWith('https:')) {
        node.properties.target = 'top';
      } else if(href.startsWith('/')) {
        let slug = href.substr(1);
        return {
          type: 'component',
          name: 'remark/link-to',
          inline: true,
          model: {
            route: 'page',
            model: slug
          },
          children: node.children
        };
      }
    }
    return node;
  }

}
