<script setup lang="ts">
const { x, y } = useMouse();
const target = ref(null);

useClickElement(target, () => {
  toast('Clicked outside of the circle!');
});
useClickElement(target, () => {
  toast('Clicked inside of the circle!');
}, "inside");
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
  greaterThan,
  lessThan,
  equalTo,
  between,
  greaterThanOrEqual,
  lessThanOrEqual
} = useWindowInfos(customBreakpoints);

const { isInside, elementPosition, elementSize, positionInside } = useMouseInElement(target);
</script>

<template>
  <div class="bg-zinc-100 w-full h-screen dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
    <div class="flex flex-col items-center justify-center h-full">
      <div class="flex items-center justify-center gap-4">
        Breakpoint: {{ breakpoint }} {{ lessThanOrEqual('md') }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Circle size: {{ size.width }} x {{ size.height }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Mouse is {{ isInside ? 'inside' : 'outside' }} the circle
      </div>
      <div class="flex items-center justify-center gap-4">
        Mouse position inside the circle: {{ positionInside.x }} x {{ positionInside.y }} - {{ elementSize.width }} x {{ elementSize.height }}
      </div>
      <div class="flex items-center justify-center gap-4">
        Element position: {{ elementPosition.x }} x {{ elementPosition.y }}
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
        <h1 class="text-4xl font-bold">
          Blanked
        </h1>
        <ThemeToggle />
      </div>
      <button
        class="mt-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md"
        @click="() => toast('Hello There!')"
      >
        Render a toast
      </button>
    </div>
    <Toasts />
  </div>
</template>
