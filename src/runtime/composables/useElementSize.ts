/**
 * @description: This composable is used to detect the size of an element (reactive).
 * @param target
 */
export function useElementSize(target: Ref<HTMLElement | null>) {
  const width = ref(0);
  const height = ref(0);

  onMounted(() => {
    if (!target.value) throw new Error('Invalid target');
    width.value = target.value.offsetWidth;
    height.value = target.value.offsetHeight;
  });

  return { width, height }
}
