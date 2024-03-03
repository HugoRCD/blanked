import {
  defineNuxtModule,
  createResolver,
  installModule,
  addComponentsDir,
  addImportsSources, addImportsDir,
} from "@nuxt/kit";
import { name, version } from '../package.json';
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
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

    nuxt.options.alias['#blanked'] = runtimeDir

    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.css.push(resolve(runtimeDir, 'assets', 'main.css'));

    // @ts-ignore
    nuxt.hook('tailwindcss:config', function (tailwindConfig) {
      tailwindConfig.plugins = tailwindConfig.plugins || []
      tailwindConfig.plugins.push(iconsPlugin(Array.isArray(options.icons) ? { collections: getIconCollections(options.icons) } : typeof options.icons === 'object' ? options.icons as IconsPluginOptions : {}));
    });

    await installModule('nuxt-icon')
    await installModule('@vueuse/nuxt')
    await installModule('@nuxt/fonts')
    await installModule('@nuxtjs/color-mode', { classSuffix: '' })
    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolve('./runtime/*.{mjs,js,ts}')
          ]
        },
        plugins: [
          require('@tailwindcss/forms')({ strategy: 'class' }),
          require('@tailwindcss/aspect-ratio'),
          require('@tailwindcss/typography'),
          require('@tailwindcss/container-queries'),
          iconsPlugin(Array.isArray(options.icons) || options.icons === 'all' ? { collections: getIconCollections(options.icons) } : typeof options.icons === 'object' ? options.icons as IconsPluginOptions : {})
        ],
      }
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
