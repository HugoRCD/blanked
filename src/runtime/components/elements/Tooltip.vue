<script setup lang="ts">
import type { PropType } from 'vue'
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/vue';

type Placement = 'bottom-end' | 'auto' | 'auto-start' | 'auto-end' | 'top' | 'bottom' | 'right' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'right-start' | 'right-end' | 'left-start' | 'left-end';

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
  offset: {
    type: Number,
    default: 4
  },
  text: {
    type: String,
    default: 'Hover me'
  },
  triggerClass: {
    type: String,
    default: ''
  },
  tooltipClass: {
    type: String,
    default: ''
  }
});

const defaultTooltipClass = "bg-white z-20 dark:bg-neutral-950 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-700 shadow px-3 py-1.5 text-xs truncate";
const defaultTriggerClass = "max-w-xs relative inline-flex";

const open = ref(false);
let openTimeout: NodeJS.Timeout | null = null
let closeTimeout: NodeJS.Timeout | null = null

const trigger = ref(null);
const tooltip = ref(null);

const placement = ref(props.placement);
const middleware = ref([offset(props.offset), flip(), shift()]);

const { floatingStyles } = useFloating(trigger, tooltip, { placement, middleware, whileElementsMounted: autoUpdate });

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
    ref="trigger"
    :class="props.triggerClass || defaultTriggerClass"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <Transition
      name="fade"
      appear
    >
      <div
        v-if="open"
        ref="tooltip"
        :class="props.tooltipClass || defaultTooltipClass"
        :style="floatingStyles"
      >
        <slot name="content">
          {{ text }}
        </slot>
      </div>
    </Transition>
    <slot />
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
