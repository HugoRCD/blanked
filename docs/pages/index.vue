<script setup lang="ts">
const { socials, appName } = useAppConfig();

const features = [
  {
    title: 'TailwindCSS',
    description: 'TailwindCSS built-in with all official plugins',
  },
  {
    title: 'Color Modes',
    description: 'Dark mode, light mode, and system mode or any custom mode you want',
  },
  {
    title: 'Toast Notifications',
    description: 'Render beautiful toast notifications with ease',
  },
  {
    title: 'Nuxt Icons',
    description: 'Use any icon from any icon pack with ease (Lucide and Heroicons are included by default)',
  },
]

const copy = ref(false);
async function copyToClipboard(string: string) {
  copy.value = true;
  const input = document.createElement("input");
  input.setAttribute("value", string);
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  toast.success("Copied to clipboard!");
  await new Promise((resolve) => setTimeout(resolve, 500));
  copy.value = false;
}
</script>

<template>
  <div class="relative h-screen overflow-hidden bg-gradient-to-b from-gray flex flex-col justify-center items-center w-full">
    <div
      class="opacity-0 dark:opacity-30 absolute bg-accent size-[1000px] rounded-full blur-[100px] bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[90%]"
    />
    <div class="mx-auto max-w-2xl text-center flex flex-col gap-6 justify-center h-96 px-4 sm:px-6 lg:px-8 z-10">
      <div class="flex items-center justify-center gap-3">
        <h1
          class="bg-gradient-to-tl from-primary to-accent to-80% bg-clip-text text-transparent
            font-main max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl lg:col-span-2 xl:col-auto"
        >
          {{ appName }}
        </h1>
        <ThemeToggle />
      </div>
      <div
        class="terminal  text-inverted text-xl bg-accent rounded-lg shadow-lg p-4 backdrop-blur-lg dark:bg-opacity-30"
        @click="copyToClipboard('bun i -d blanked')"
      >
        <div class="text-pretty  leading-6 tracking-wide cursor-pointer flex items-center justify-center gap-2">
          <span>
            bun i -D blanked
          </span>
          <span
            v-if="!copy"
            class="i-lucide-copy"
          />
          <span
            v-else
            class="i-lucide-check text-white dark:text-black text-lg"
          />
        </div>
      </div>
      <p class="text-muted text-lg leading-6 text-pretty">
        A Nuxt module to improve your developer experience, give you a head start and make your life easier.
        Add tailwindcss, toast notifications, dark mode, and more to your Nuxt app in seconds.
        <span>
          Made with love by
          <NuxtLink
            class="text-accent"
            to="https://hrcd.fr"
          >
            HugoRCD
          </NuxtLink>
        </span>
      </p>
      <div>
        <div>
          <button
            class="inline-flex items-center justify-center px-6 py-1 ml-4 text-base font-medium text-inverted bg-accent border border-transparent rounded-md shadow-sm hover:bg-accent-hover"
            @click="() => toast.info('Hello There!')"
          >
            Render a toast
          </button>
        </div>
        <div class="flex items-center gap-4 text-primary justify-center mt-4">
          <NuxtLink
            v-for="social in socials"
            :key="social.name"
            :to="social.url"
            :class="`${social.icon} size-6 text-2xl text-primary cursor-pointer hover:text-accent transition-colors duration-300`"
          />
        </div>
      </div>
      <div
        class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"
      >
        <div
          v-for="feature in features"
          :key="feature.title"
          class="h-full flex flex-col bg-primary rounded-lg shadow-lg p-6"
        >
          <h2 class="text-xl font-bold text-primary">
            {{ feature.title }}
          </h2>
          <p class="mt-3 text-base text-muted">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
    <Toasts
      :visible-toasts="5"
      close-button
    />
  </div>
</template>

<style scoped>

</style>
