<script setup lang="ts">
import type { Position, Theme, ToastOptions } from "vue-sonner/lib/types";
import type { CSSProperties } from "vue";
import { Toaster } from "vue-sonner";

interface ToasterProps {
  invert?: boolean;
  theme?: Theme;
  position?: Position;
  hotkey?: string[];
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  gap?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: ToastOptions;
  className?: string;
  style?: CSSProperties;
  offset?: string | number;
  dir?: 'rtl' | 'ltr' | 'auto';
}

// Default amount of visible toasts
const VISIBLE_TOASTS_AMOUNT = 4

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
