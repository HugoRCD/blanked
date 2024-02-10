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
      document.documentElement.style.setProperty('--mouse-x', `${x.value}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y.value}px`);
    });
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', (event) => {
      x.value = event.clientX;
      y.value = event.clientY;
      document.documentElement.style.removeProperty('--mouse-x');
      document.documentElement.style.removeProperty('--mouse-y');
    });
  });

  return { x, y }
}
