<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'

import type { PropType } from "vue";
import { ref } from 'vue';

const props = defineProps({
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  preventClose: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String as PropType<"left" | "right">,
    default: "right",
  },
});

const open = defineModel({type: Boolean, default: false});
const dialog = ref(null);

const emit = defineEmits(['close', 'close-prevented']);

function close (value: boolean) {
  if (props.preventClose) {
    emit('close-prevented')

    return
  }
  open.value = value
  emit('close')
}
</script>

<template>
  <div>
    <slot name="trigger">
      <button
        class="px-4 py-2 text-white bg-blue-500 rounded-md"
        @click="open = true"
      >
        Open Sidebar
      </button>
    </slot>
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        class="fixed inset-0 flex z-50"
        :class="side === 'left' ? 'justify-start' : 'justify-end'"
        :initial-focus="dialog"
        @close="close"
      >
        <TransitionChild
          v-if="overlay"
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed z-0 inset-0 transition-opacity bg-gray-200/75 dark:bg-gray-800/75" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transform transition ease-in-out duration-300"
          leave="transform transition ease-in-out duration-200"
          :enter-from="side === 'left' ? '-translate-x-full' : 'translate-x-full'"
          enter-to="translate-x-0"
          leave-from="translate-x-0"
          :leave-to="side === 'left' ? '-translate-x-full' : 'translate-x-full'"
        >
          <DialogPanel
            ref="dialog"
            class="relative"
          >
            <slot />
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>

</style>
