import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';
import path from 'path';
import fs from 'fs'; // Import standard file system

export function rehypeImageMetadata() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties.src) {
        const src = node.properties.src;

        // 1. Skip remote images or empty sources
        if (!src || src.startsWith('http')) return;

        // 2. Clean the path (remove leading slash if present)
        // e.g. "/ny.jpg" -> "ny.jpg" so path.join works reliably
        const relativeSrc = src.startsWith('/') ? src.slice(1) : src;

        // 3. Construct absolute path
        const imagePath = path.join(process.cwd(), 'public', relativeSrc);

        try {
          // 4. FIX: Read file to Buffer first
          // This ensures 'image-size' gets exactly what it expects
          const buffer = fs.readFileSync(imagePath);
          const dimensions = sizeOf(buffer);

          node.properties.width = dimensions.width;
          node.properties.height = dimensions.height;
        } catch (error) {
          // This will now catch "File not found" (ENOENT) clearly
          console.warn(`⚠️  [Rehype] Could not measure image: "${src}"`);
          console.warn(`   Looking at: ${imagePath}`);
          console.warn(`   Error: ${error.message}`);
        }
      }
    });
  };
}