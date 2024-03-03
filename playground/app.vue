<script setup lang="ts">
import Sidebar from "#blanked/components/elements/Sidebar.vue";

const { x, y } = useMouse();
const target = ref(null);

/*onClickOutside(target, () => {
  toast('Clicked outside of the circle!');
});*/
const size = useElementSize(target);

const customBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

const {
  width,
  height,
  scroll,
  breakpoint,
  lessThanOrEqual
} = useWindowInfos(customBreakpoints);

const { isOutside, elementX, elementY, elementPositionX, elementPositionY } = useMouseInElement(target);

onMounted(() => {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  });
});

onUnmounted(() => {
  document.removeEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  });
});
const open = ref(false);
const openSidebar = ref(false);
</script>

<template>
  <div class="bg-zinc-100 w-full h-[1000px] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
    <!--    <div class="absolute pointer-events-none transform translate-x-[&#45;&#45;x] translate-y-[&#45;&#45;y]">
      <div
        class="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        :class="{
          'bg-red-500': isOutside,
          'bg-green-500 scale-[2] cursor-pointer': !isOutside
        }"
      />
    </div>-->
    <div class="flex flex-col items-center justify-center h-full">
      <div class="flex items-center justify-center gap-4">
        Breakpoint: {{ breakpoint }} {{ lessThanOrEqual('md') }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Circle size: {{ size.width }} x {{ size.height }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Mouse is {{ !isOutside ? 'inside' : 'outside' }} the circle
      </div>
      <div class="flex items-center justify-center gap-4">
        Mouse position inside the circle: {{ elementX }} x {{ elementY }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Element position: {{ elementPositionX }} x {{ elementPositionY }}
      </div>
      <div
        ref="target"
        class="size-36 bg-zinc-500 dark:bg-zinc-600 rounded-full flex items-center justify-center"
      >
        Click me
      </div>
      <div class="flex items-center justify-center gap-4">
        Mouse position: {{ x }} x {{ y }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Window size: {{ width }} x {{ height }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Scroll position: {{ scroll.x }} x {{ scroll.y }}
      </div>
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-4xl font-bold font-space-grotesk">
          Blanked
        </h1>
        <ThemeToggle />
      </div>
      <div class="flex items-center justify-center gap-4">
        <Modal v-model="open">
          <template #trigger>
            <button
              class="px-4 py-2 text-white bg-red-500 rounded-md"
              @click="() => open = true"
            >
              Open Dialog
            </button>
          </template>
          <div class="bg-white dark:bg-neutral-800 p-4 rounded-md w-96 h-96 flex flex-col items-center justify-center border-2 border-black/10 dark:border-white/10 shadow-lg text-black dark:text-white">
            <h1 class="text-2xl font-bold">
              Hello World
            </h1>
            <p class="mt-4">
              This is a dialog
            </p>
          </div>
        </Modal>
        <Sidebar v-model="openSidebar">
          <div class="flex flex-col h-full items-center justify-center gap-4 w-72 bg-white dark:bg-neutral-800 p-4 shadow-lg text-black dark:text-white">
            <h1 class="text-4xl font-bold">
              Blanked
            </h1>
            <ThemeToggle />
          </div>
        </Sidebar>
      </div>
      <button
        class="mt-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md"
        @click="() => toast('Hello There!')"
      >
        Render a toast
      </button>
      <Tooltip
        placement="bottom"
        text="I'm a tooltip"
      >
        <button class="mt-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-md">
          Hover me
        </button>
      </Tooltip>
    </div>
    <Toasts />
  </div>
</template>

<style scoped>
.font-geist {
  font-family: 'Geist', sans-serif;
}

.font-space-grotesk {
  font-family: 'Space Grotesk', sans-serif;
}
</style>
