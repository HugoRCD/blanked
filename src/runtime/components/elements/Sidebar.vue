<script setup lang="ts">
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'

const open = defineModel({ type: Boolean, default: false });

const emit = defineEmits(["close"]);

function close() {
  open.value = false;
  setTimeout(() => {
    document.body.style.removeProperty("overflow");
    emit("close");
  }, 500);
}
const slideOver = ref(null);
onClickOutside(slideOver, () => close());

watch(open, () => {
  if (open.value)
    document.body.style.setProperty("overflow", "hidden");
});
</script>

<template>
  <div class="relative">
    <transition
      enter-active-class="ease-in-out duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in-out duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm transition-opacity"
      />
    </transition>
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <transition
            enter-active-class="transform transition ease-in-out duration-500"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-if="open"
              ref="slideOver"
              class="pointer-events-auto w-screen max-w-md relative"
            >
              <div
                class="absolute top-0 left-0 -ml-8 flex pt-2 pr-2 sm:-ml-10 sm:pr-4"
              >
                <button
                  type="button"
                  class="rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-white h-8 w-8 flex items-center justify-center"
                  @click="close"
                >
                  <span class="sr-only">Close panel</span>

                  <icon
                    name="fluent:dismiss-24-filled"
                    class="h-6 w-6"
                  />
                </button>
              </div>
              <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                      Panel title
                    </h3>
                    <div class="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        @click="open = false"
                      >
                        <span class="absolute -inset-2.5" />
                        <span class="sr-only">Close panel</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative mt-6 flex-1 px-4 sm:px-6 bg-gray-400 justify-center items-center">
                  Sidebar
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
