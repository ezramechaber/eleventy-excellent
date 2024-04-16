import esbuild from 'esbuild';
import path from 'node:path';

export const jsConfig = eleventyConfig => {
  eleventyConfig.addTemplateFormats('js');

  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (content, inputPath) => {

			if (!inputPath.startsWith('./src/assets/scripts/')) {
        return;
      }

      if (inputPath.startsWith('./src/assets/scripts/inline/')) {
        const filename = path.basename(inputPath);
        const outputFilename = filename.replace(/\.js$/, '-inline.js');
        const outputPath = `./src/_includes/scripts/${outputFilename}`;

        await esbuild.build({
          target: 'es2020',
					platform: 'node',
          entryPoints: [inputPath],
          outfile: outputPath,
          bundle: true,
          minify: true
        });
        return;
      }

      return async () => {
        let output = await esbuild.build({
          target: 'es2020',
          entryPoints: [inputPath],
          minify: true,
          bundle: true,
          write: false
        });

        return output.outputFiles[0].text;
      };
    }
  });
};