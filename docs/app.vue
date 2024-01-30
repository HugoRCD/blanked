<script setup lang="ts">
const { appName } = useAppConfig();

useHead({
  title: appName + " - A Nuxt Module to improve your developer experience",
  meta: [
    {
      name: 'description',
      content: 'A Nuxt module to improve your developer experience, give you a head start and make your life easier. Add tailwindcss, toast notifications, dark mode, and more to your Nuxt app in seconds.'
    },
    {
      name: 'keywords',
      content: 'nuxt, nuxtjs, nuxt.js, nuxt module, nuxt modules, nuxt toast, nuxt tailwindcss, nuxt tailwind, nuxt dark mode, nuxt darkmode, nuxt dark, nuxt color mode, nuxt color-mode, nuxt color-mode-module, nuxt color-mode-module, nuxt color mode module, nuxt color-mode module, nuxt color mode, nuxt color-mode, nuxt color mode-module, nuxt color mode-module, nuxt color mode module, nuxt color-mode module, nuxt color mode, nuxt color-mode, nuxt color mode-module, nuxt color mode-module, nuxt color mode module, nuxt color-mode module, nuxt color mode, nuxt color-mode, nuxt color mode-module, nuxt color mode-module, nuxt color mode module, nuxt color-mode module, nuxt color mode, nuxt color-mode, nuxt color mode-module, nuxt color mode-module, nuxt color mode module, nuxt color-mode module, nuxt color mode, nuxt color-mode, nuxt color mode-module, nuxt color mode-module, nuxt color mode module, nuxt color-mode module'
    },
    {
      name: 'og:title',
      content: appName + " - A Nuxt Module to improve your developer experience"
    },
    {
      name: 'og:description',
      content: 'A Nuxt module to improve your developer experience, give you a head start and make your life easier. Add tailwindcss, toast notifications, dark mode, and more to your Nuxt app in seconds.'
    },
    {
      name: 'og:image',
      content: 'https://blanked.hrcd.fr/blanked-social-preview.png'
    },
    {
      name: 'og:url',
      content: 'https://blanked.hrcd.fr'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: appName + " - A Nuxt Module to improve your developer experience"
    },
    {
      name: 'twitter:description',
      content: 'A Nuxt module to improve your developer experience, give you a head start and make your life easier. Add tailwindcss, toast notifications, dark mode, and more to your Nuxt app in seconds.'
    },
    {
      name: 'twitter:image',
      content: 'https://blanked.hrcd.fr/blanked-social-preview.png'
    },
    {
      name: 'twitter:url',
      content: 'https://blanked.hrcd.fr'
    }
  ],
})

</script>

<template>
  <Html lang="en">
    <Body class="bg-primary selection:bg-accent selection:text-primary">
      <NuxtPage />
    </Body>
  </Html>
</template>
