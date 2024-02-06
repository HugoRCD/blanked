/**
 * @description: This composable is used to detect the window size (reactive).
 * @returns { width, height }
 */
export function useWindowSize() {
  const width = ref(0);
  const height = ref(0);

  onMounted(() => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    window.addEventListener('resize', () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    });
  });

  return { width, height }
}
