<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger, VisuallyHidden,
} from 'radix-vue';

defineProps({
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'Dialog Title',
  },
  description: {
    type: String,
    default: 'A simple dialog',
  },
});
</script>

<template>
  <DialogRoot>
    <DialogTrigger>
      <slot name="trigger">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
          Open Dialog
        </button>
      </slot>
    </DialogTrigger>
    <DialogPortal>
      <DialogClose class="absolute top-4 right-4" />
      <VisuallyHidden>
        <DialogTitle class="text-2xl font-bold">
          {{ title }}
        </DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </VisuallyHidden>
      <Transition
        v-if="overlay"
        name="fade"
      >
        <DialogOverlay class="bg-black/50 fixed inset-0 z-30" />
      </Transition>
      <Transition name="appear">
        <DialogContent
          class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] focus:outline-none z-[100]"
        >
          <slot />
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.appear-enter-active,
.appear-leave-active {
  transition: transform 0.2s, opacity 0.1s;
}

.appear-enter-from {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}

.appear-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.appear-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.appear-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}
</style>
