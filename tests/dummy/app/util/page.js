import { getOwner } from '@ember/application';

export const load = async (caller, name) => {

  let service = name => getOwner(caller).lookup(`service:${name}`);

  let content = service('content');
  let models = service('models');

  let file = content.file(name);
  await file.load();

  let model = models.create('page', { file });
  await model.load();

  return model;
}
