import { createDefaultConfig } from '@open-wc/building-rollup';
const babel = require('rollup-plugin-babel');

// if you need to support IE11 use "modern-and-legacy-config" instead.
//import { createCompatibilityConfig } from '@open-wc/building-rollup';
//export default createCompatibilityConfig({ input: './index.html' });

export default createDefaultConfig(
    {
        input: './index.html',
        // Deshabilitem babel
        // L'ideal seria utilitzar-lo, i incloure 
        // opcions per a que no faça el removeComments
        plugins: {
            babel: false,
            plugins: [
                //["/srv/cvs/classjam2/cj2pwa/cj-app/node_modules/babel-plugin-template-html-minifier/lib/index.js", {
                require.resolve('babel-plugin-template-html-minifier'),
                {
                    modules: {
                        'lit-html': ['html']
                    },
                    htmlMinifier: {
                        removeComments: false
                    }

                }]
        }
    }

);

/*createBasicConfig(_options) {
    const options = {
      outputDir: 'dist',
      extensions: defaultFileExtensions,
      indexHTMLPlugin: {},
      ..._options,
      plugins: {
        indexHTML: _options.input.endsWith('.html'),
        workbox: true,
        babel: true,
        ...(_options.plugins || {}),
      },
    };*/




/*import deepmerge from 'deepmerge';

const basicConfig = createDefaultConfig({
    input: './index.html'
});

export default deepmerge(basicConfig, {
    plugins: [
        babel({
            plugins: [
                ["/srv/cvs/classjam2/cj2pwa/cj-app/node_modules/babel-plugin-template-html-minifier/lib/index.js", {
                modules: {
                  'lit-htm': ['html']
                },
                htmlMinifier: {
                  removeComments: false
                }
              }]
              ]


        })]
}
);
*/

//export default createDefaultConfig({ input: './index.html', });
