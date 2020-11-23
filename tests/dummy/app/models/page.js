import Page from 'ember-cli-remark-static/static/page';

export default Page.extend({

  preprocessNode(parent, node) {
    if(node.tagName === 'img') {
      let src = node.properties.src;
      if(src.startsWith('/')) {
        let baseURL = this.service.baseURL;
        node.properties.src = `${baseURL}${src}`;
      }
    } else if(node.tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('/')) {
        node.componentName = 'remark/render/route';
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
      // by default it tries to render remark/render/image-gallery
      node.componentName = 'custom/image-gallery';
    }
  }

});
