const path = require('path');
const glob = require('glob');
const fs = require('fs');
const { toContent } = require('./content');

let list = (dir, extensions) => new Promise((resolve, reject) => {
  glob(`**/*.+(${extensions.join('|')})`, { cwd: dir, nodir: true }, (err, arg) => {
    if(err) {
      return reject(err);
    }
    resolve(arg);
  });
});

let readFile = (dir, file, ...args) => new Promise((resolve, reject) => {
  fs.readFile(path.join(dir, file), ...args, (err, arg) => {
    if(err) {
      return reject(err);
    }
    resolve(arg);
  });
});

let markdown = async (dir, file, opts) => {
  let matter = require('front-matter');
  let content = await readFile(dir, file, 'utf-8');
  let { attributes, body } = matter(content);
  let { toc } = await toContent(body, opts);
  return {
    type: 'markdown',
    attributes,
    toc
  };
}

let binary = async () => {
  return {
    type: 'binary',
    attributes: {}
  };
}

let build = async (dir, extensions, opts) => {
  let files = await list(dir, extensions);

  let hash = {};
  await Promise.all(files.map(async file => {
    let meta = null;
    if(file.endsWith('.md')) {
      meta = await markdown(dir, file, opts);
    } else {
      meta = await binary(dir, file, opts);
    }
    hash[file] = meta;
  }));

  return JSON.stringify(hash);
}

module.exports = build;
