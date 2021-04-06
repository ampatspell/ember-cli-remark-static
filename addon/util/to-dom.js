import { assert } from '@ember/debug';

const attributes = [ 'src', 'alt', 'href', 'target' ];

export const toDOM = tree => {
  let components = [];

  const toElements = (parent, nodes=[]) => {
    nodes?.forEach(node => {
      let el = toElement(node);
      if(el) {
        parent.appendChild(el);
      }
    });
    return parent;
  };

  const createElement = (name, node, className) => {
    let element = document.createElement(name);
    let properties = node.properties;
    if(properties) {
      properties.className?.forEach(className => {
        element.classList.add(className);
      });
      for(let key in properties) {
        if(attributes.includes(key)) {
          let value = properties[key];
          element[key] = value;
        } else {
          // temporary
          if(key !== 'className') {
            console.warn('Unmapped node property', key);
          }
        }
      }
    }
    if(className) {
      element.classList.add(className);
    }
    return element;
  }

  const toElement = node => {
    if(node) {
      let { type } = node;
      if(type === 'root') {
        let element = createElement('div', node, 'root');
        return toElements(element, node.children);
      } else if(type === 'element') {
        let element = createElement(node.tagName, node);
        return toElements(element, node.children);
      } else if(type === 'text') {
        return document.createTextNode(node.value);
      } else if(type === 'component') {
        let element = createElement(node.inline ? 'span' : 'div', node, 'component');
        let { name, model } = node;
        let content = toElements(document.createElement('span'), node.children);
        components.push({
          element,
          name,
          model,
          content
        });
        return element;
      }
      assert(`Unsupported node '${type}'`, false);
    }
  }

  let element = toElement(tree);

  return {
    element,
    components
  };
}
