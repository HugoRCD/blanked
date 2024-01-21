<template>
  <ClientOnly>
    <span
      class="cursor-pointer size-8"
      :class="$colorMode.value === 'light' ? 'i-heroicons-moon-20-solid text-zinc-900' : 'i-heroicons-sun-20-solid text-zinc-100'"
      @click="$colorMode.value === 'light' ? ($colorMode.preference = 'dark') : ($colorMode.preference = 'light')"
    />
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
