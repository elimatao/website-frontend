import { visit } from 'unist-util-visit';

export function remarkUnwrapImages() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      // 1. check if this paragraph contains ONLY images (and whitespace)
      const isOnlyImages = node.children.every((child) => {
        return (
          child.type === 'image' || 
          (child.type === 'text' && child.value.trim() === '')
        );
      });

      // 2. If it is just images, unwrap them
      if (isOnlyImages) {
        parent.children.splice(index, 1, ...node.children);
        // (Optional) We essentially just deleted the <p> and put the <img> 
        // right into the parent (usually root or div)
        return index;
      }
    });
  };
}