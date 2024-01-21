![blanked-social-preview.png](blanked-social-preview.png)

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/blanked">
    <img alt="" src="https://img.shields.io/npm/v/blanked.svg?style=for-the-badge&labelColor=000000&color=E05C44">
  </a>
  <a aria-label="License" href="https://github.com/HugoRCD/blanked/main/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/blanked.svg?style=for-the-badge&labelColor=000000&color=E05C44">
    </a>
  <a aria-label="Follow Hugo on Twitter" href="https://twitter.com/HugoRCD__">
    <img alt="" src="https://img.shields.io/twitter/follow/HugoRCD__.svg?style=for-the-badge&labelColor=000000&logo=twitter&label=Follow%20Hugo&logoWidth=20&logoColor=white">
  </a>
</p>

Blanked is a Nuxt module to improve your Nuxt workflow. It's a simple module to add everything you need to your Nuxt app, including:
- TailwindCSS
- Color Mode, add a color mode switcher to your app (dark/light or custom)
- Icons, add every icons from your favorite icon pack (Heroicons and Lucide are pre-installed)

Thanks to @egoist/tailwindcss-icons plugin, only the icons you use in your app will be bundled in your CSS. However, you need to install the icon collections you specified in the blanked.icons key:
  
  ```bash
  bun i -D @iconify-json/{collection_name}
  ```

## Quick Setup

To get started, follow these steps:

1. Add `blanked` dependency to your project

```bash
# Using bun
bun install -D blanked

# Using pnpm
pnpm add -D blanked

# Using yarn
yarn add --dev blanked

# Using npm
npm install --save-dev blanked
```

2. Add `blanked` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'blanked'
  ]
})
```

That's it! You can now use Blanked in your Nuxt app ✨

## Authors

**Blanked Module**

- Hugo Richard ([@HugoRCD__](https://x.com/HugoRCD__))
- Johann Cavallucci ([@JohannCavallucci](https://github.com/cavalluccijohann))

## Thanks

This module is heavily inspired by the NuxtUI module, which embeds TailwindCSS, Color Mode and Icons in your Nuxt app. However, I wanted to make a module to start a Nuxt project without the components, etc...

