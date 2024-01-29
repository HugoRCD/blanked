<script setup lang="ts">
import { Toaster, ToasterProps } from "vue-sonner";

const VISIBLE_TOASTS_AMOUNT = 3

// Viewport padding
const VIEWPORT_OFFSET = '32px'

// Default lifetime of a toasts (in ms)
const TOAST_LIFETIME = 4000

// Default gap between toasts
const GAP = 14

withDefaults(defineProps<ToasterProps>(), {
  invert: false,
  position: 'top-right',
  hotkey: () => ['altKey', 'KeyT'],
  expand: false,
  closeButton: false,
  className: '',
  offset: VIEWPORT_OFFSET,
  theme: 'light',
  richColors: false,
  duration: TOAST_LIFETIME,
  visibleToasts: VISIBLE_TOASTS_AMOUNT,
  toastOptions: () => ({}),
  dir: 'auto',
  gap: GAP,
  style: () => ({}),
})
</script>

<template>
  <Toaster
    :position
    :invert
    :hotkey
    :expand
    :close-button
    :class-name
    :offset
    :style="style"
    :theme="$colorMode.preference === 'dark' ? 'dark' : 'light'"
    :rich-colors
    :duration
    :visible-toasts
    :toast-options
    :dir
    :gap
  />
</template>

<style scoped>

</style>
