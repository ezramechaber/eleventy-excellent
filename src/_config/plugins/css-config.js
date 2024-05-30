import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssImportExtGlob from 'postcss-import-ext-glob';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export const cssConfig = eleventyConfig => {
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (inputContent, inputPath) => {
      const paths = [];
      if (inputPath.endsWith('/src/assets/css/global.css')) {
        paths.push('dist/assets/css/global.css');
        paths.push('src/_includes/css/global.css'); // Assuming you might want to keep naming consistent for ease
      } else if (inputPath.includes('/src/assets/css/opt-in/')) {
        const baseName = path.basename(inputPath);
        paths.push(`dist/assets/css/opt-in/${baseName}`);
        paths.push(`src/_includes/css/${baseName}`);
      } else {
        return;
      }

      return async () => {
        let result = await postcss([
          postcssImportExtGlob,
          postcssImport,
          tailwindcss,
          autoprefixer,
          cssnano
        ]).process(inputContent, {from: inputPath});

        // Write the output to all specified paths
        for (const outputPath of paths) {
          await fs.mkdir(path.dirname(outputPath), {recursive: true});
          await fs.writeFile(outputPath, result.css);
          console.log(`CSS written to: ${outputPath}`);
        }

        return result.css;
      };
    }
  });
};
