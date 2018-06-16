import Service from 'ember-cli-remark-static/static/service';

export default Service.extend({

  identifier: 'markdown',

  preprocessNode(page, parent, node) {
    if(node.tagName === 'img') {
      let src = node.properties.src;
      if(src.startsWith('/')) {
        let baseURL = this.get('baseURL');
        node.properties.src = `${baseURL}${src}`;
      }
    } else if(node.tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('/')) {
        node.componentName = 'ui-remark/render/route';
        let url = href.substr(1);
        let routeName;
        let id;
        let components = url.split('/');
        if(components[0] === 'pages') {
          routeName = 'pages';
          id = components[1];
        } else {
          routeName = url;
        }
        node.properties.routeName = routeName;
        node.properties.id = id;
      }
    } else if(node.tagName === 'image-gallery') {
      // choose a compoent name for <image-gallery></image-gallery> element
      node.componentName = 'image-gallery';
    }
  }

});
