import { Ref } from "vue";

/**
 * @description: This composable is used to detect clicks inside or outside of a target element.
 * @param target
 * @param handler
 * @param mode
 */
export function useClickElement(target: Ref<HTMLElement | null>, handler: (event: MouseEvent) => void, mode: "inside" | "outside" = "outside") {
  const listener = (event: MouseEvent) => {
    if (mode === "inside" && target.value.contains(event.target as Node)) {
      handler(event);
    } else if (mode === "outside" && !target.value.contains(event.target as Node)) {
      handler(event);
    }
  };

  onMounted(() => {
    if (mode !== "inside" && mode !== "outside") throw new Error('Invalid mode');
    if (!target.value) throw new Error('Invalid target');

    document.addEventListener('click', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('click', listener);
  });
}
