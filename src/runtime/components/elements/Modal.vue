<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild, provideUseId } from '@headlessui/vue'
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
        Open Dialog
      </button>
    </slot>
    <TransitionRoot
      :show="open"
      as="template"
    >
      <Dialog
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
          <div class="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            ref="dialog"
            class="flex min-h-full items-end sm:items-center justify-center text-center"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel>
                <slot />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
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
