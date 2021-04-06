import { getOwner } from '@ember/application';

export const load = async (caller, name) => {

  let service = name => getOwner(caller).lookup(`service:${name}`);

  let content = service('content');
  let models = service('models');

  let file = content.file(name);
  await file.load();

  return models.create('page', { file });
}
