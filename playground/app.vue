<template>
  <div class="bg-zinc-100 w-full h-screen dark:bg-zinc-900">
    <div class="flex flex-col items-center justify-center h-full">
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Blanked
        </h1>
        <ThemeToggle />
      </div>
      <button @click="() => toast('Hello world!')" class="mt-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">
        Render a toast
      </button>
    </div>
    <Toaster position="top-right" />
  </div>
</template>

<script setup>
</script>
