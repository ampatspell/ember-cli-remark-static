import { cached } from "tracked-toolbox";
import { tracked } from "@glimmer/tracking";
import { toTree } from './to-tree';
import { visit } from './visit';

const {
  assign
} = Object;

class RemarkContent {

  promise = null;
  @tracked isLoading = true;
  @tracked isLoaded = false;
  @tracked isError = false;
  @tracked error = null;
  @tracked content = null;

  constructor(opts) {
    this.promise = this._load(opts);
  }

  async _load({ body, visitor }) {
    try {
      let root = await toTree(body);
      if(visitor) {
        root = visit(root, visitor);
      }
      this.isLoaded = true;
      this.isLoading = false;
      this.content = root;
    } catch(err) {
      this.isError = true;
      this.isLoading = false;
      this.error = err;
    }
  }

  load(opts) {
    let { type } = assign({ type: 'swallow' }, opts);
    return this.promise.then(() => this, err => {
      if(type === 'swallow' || type === 'silent') {
        if(type !== 'silent') {
          console.error(err);
        }
        return this;
      }
      return Promise.reject(err);
    });
  }

}

// @remark('body')
// tree(node) {
//   let { type, tagName } = node;
//   if(tagName === 'a') {
//     node.properties.target = 'top';
//   }
//   return node;
// }
export const remark = bodyKey => (target, key, descriptor) => cached(target, key, {
  get() {
    let body = this[bodyKey];
    let visitor = descriptor.value?.bind(this);
    return new RemarkContent({ body, visitor });
  }
});
