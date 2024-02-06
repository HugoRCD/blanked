import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description: This composable is used to detect mouse position (reactive).
 * @returns {x, y}
 */
export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  onMounted(() => {
    x.value = window.innerWidth;
    y.value = window.innerHeight;
    window.addEventListener('mousemove', (event) => {
      x.value = event.clientX;
      y.value = event.clientY;
    });
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', (event) => {
      x.value = event.clientX;
      y.value = event.clientY;
    });
  });

  return { x, y }
}
