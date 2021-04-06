import File from '../file';

export default class MetadataFile extends File {

  async _load(res) {
    this.json = await res.json();
  }

}
