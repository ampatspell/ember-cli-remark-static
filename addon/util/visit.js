export const visit = (node, visitor) => {
  node = visitor(node);
  if(node) {
    let children = [];
    if(node.children) {
      node.children.forEach(child => {
        child = visit(child, visitor);
        if(child) {
          children.push(child);
        }
      });
      node.children = children;
    }
  }
  return node;
}
