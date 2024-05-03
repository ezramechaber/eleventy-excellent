/**
 * CSS as first-class citizen in Eleventy
 * Credits:
 * - Vadim Makeev - https://pepelsbey.dev/articles/eleventy-css-js/
 */

import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssImportExtGlob from 'postcss-import-ext-glob';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'node:fs/promises';
import path from 'node:path';

export const cssConfig = eleventyConfig => {
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (inputContent, inputPath) => {
      // Only process the specific file
      if (!inputPath.endsWith('/src/assets/css/global.css')) {
        return () => '';
      }

      return async () => {
        let result = await postcss([
          postcssImportExtGlob,
          postcssImport,
          tailwindcss,
          autoprefixer,
          cssnano
        ]).process(inputContent, {from: inputPath});

        // Path for the additional output
        const additionalPath = './src/_includes/css/global-inline.css';

        // Ensure the directory exists (create if it doesn't)
        await fs.mkdir(path.dirname(additionalPath), {recursive: true});

        // Write the output to the new location
        await fs.writeFile(additionalPath, result.css);

        // Return the CSS for the primary output location
        return result.css;
      };
    }
  });
};
