<script setup lang="ts">
import type { PropType } from 'vue'
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/vue';

type Placement = 'bottom-end' | 'top' | 'bottom' | 'right' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'right-start' | 'right-end' | 'left-start' | 'left-end';

const props = defineProps({
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top'
  },
  gap: {
    type: Number,
    default: 4
  },
  text: {
    type: String,
    default: 'Hover me'
  },
  referenceClass: {
    type: String,
    default: ''
  },
  floatingClass: {
    type: String,
    default: ''
  }
});

const defaultReferenceClass = "bg-white z-20 dark:bg-neutral-950 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-700 shadow px-3 py-1.5 text-xs truncate";
const defaultFloatingClass = "max-w-xs relative inline-flex";

const open = ref(false);
let openTimeout: NodeJS.Timeout | null = null
let closeTimeout: NodeJS.Timeout | null = null

const reference = ref(null);
const floating = ref(null);

const placement = ref(props.placement);
const middleware = ref([offset(props.gap), flip(), shift()]);

const { floatingStyles } = useFloating(reference, floating, { placement, middleware, whileElementsMounted: autoUpdate });

function onMouseOver () {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  if (open.value) {
    return
  }
  openTimeout = openTimeout || setTimeout(() => {
    open.value = true
    openTimeout = null
  }, props.openDelay)
}

function onMouseLeave () {
  if (openTimeout) {
    clearTimeout(openTimeout)
    openTimeout = null
  }
  if (!open.value) {
    return
  }
  closeTimeout = closeTimeout || setTimeout(() => {
    open.value = false
    closeTimeout = null
  }, props.closeDelay)
}
</script>

<template>
  <div
    ref="reference"
    :class="referenceClass.length ? referenceClass : defaultFloatingClass"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <Transition
      name="fade"
      appear
    >
      <div
        v-if="open"
        ref="floating"
        :class="floatingClass.length ? floatingClass : defaultReferenceClass"
        :style="floatingStyles"
      >
        <slot name="content">
          {{ text }}
        </slot>
      </div>
    </Transition>
    <slot :open="open">
      Hover
    </slot>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
