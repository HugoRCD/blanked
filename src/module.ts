import {
  defineNuxtModule,
  createResolver,
  installModule,
  addTemplate,
  addComponentsDir,
  addImportsSources, addImportsDir,
} from "@nuxt/kit";
import { join } from 'node:path'
import { name, version } from '../package.json';
import type { CollectionNames, IconsPluginOptions } from "@egoist/tailwindcss-icons";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable auto-import of all components (like the 'ThemeToggle' component)
   * @default true
   */
  injectComponents?: boolean
  /**
   * Enable auto-import of all composables
   * @default true
   */
  injectComposables?: boolean
  /**
   * The icon collections to use
   * @default ['heroicons', 'lucide']
   */
  icons: CollectionNames[] | 'all' | IconsPluginOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'blanked',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    icons: ['heroicons', 'lucide'],
    injectComponents: true,
    injectComposables: true
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve('./runtime');

    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.css.push(resolve(runtimeDir, 'assets', 'main.css'));

    await installModule('nuxt-icon')
    await installModule('@nuxtjs/color-mode', { classSuffix: '' })
    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      configPath: [
        addTemplate({
          filename: 'blanked-tailwind.config.cjs',
          write: true,
          getContents: () => `
            const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
            module.exports = {
              darkMode: 'class',
              content: {
                files: [
                  ${JSON.stringify(resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}'))},
                  ${JSON.stringify(resolve(runtimeDir, '*.{mjs,js,ts}'))}
                ]
              },
              plugins: [
                require('@tailwindcss/forms')({ strategy: 'class' }),
                require('@tailwindcss/aspect-ratio'),
                require('@tailwindcss/typography'),
                require('@tailwindcss/container-queries'),
                iconsPlugin(${Array.isArray(options.icons) ? `{ collections: getIconCollections(${JSON.stringify(options.icons)}) }` : typeof options.icons === 'object' ? JSON.stringify(options.icons) : '{}'})
              ]
            }
          `
        }).dst,
        join(nuxt.options.rootDir, 'tailwind.config')
      ]
    })
    addImportsSources({
      from: 'vue-sonner',
      imports: ['toast'],
    })
    if (options.injectComposables) {
      addImportsDir(resolve(runtimeDir, 'composables'))
    }
    if (options.injectComponents) {
      await addComponentsDir({
        path: resolve(runtimeDir, 'components', 'elements'),
        watch: false
      })
    }
  }
})
