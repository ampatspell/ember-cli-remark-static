import File from '../file';

export default class BinaryFile extends File {

  async _load(res) {
    this.blob = await res.blob();
  }

  _metadata({ attributes }) {
    this.attributes = attributes;
  }

}
