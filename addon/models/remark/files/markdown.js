import File from '../file';
import frontMatter from 'front-matter';

export default class MarkdownFile extends File {

  async _load(res) {
    let text = await res.text();
    let { attributes, body } = frontMatter(text);
    this.attributes = attributes;
    this.body = body;
  }

  _metadata({ attributes, toc }) {
    this.attributes = attributes;
    this.toc = toc;
  }

}
