import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export interface MouseInElement {
  mouseX: Ref<number>;
  mouseY: Ref<number>;
  isInside: Ref<boolean>;
  positionInside: Ref<{ x: number; y: number }>;
  elementSize: Ref<{ width: number; height: number }>;
  elementPosition: Ref<{ x: number; y: number }>;
}

/**
 * @description Reactive mouse position related to an element.
 * @param target
 * @return MouseInElement
 */
export function useMouseInElement(target: Ref<HTMLElement | null>): MouseInElement {
  const mouseX = ref(0);
  const mouseY = ref(0);
  const isInside = ref(false);
  const positionInside = ref({ x: 0, y: 0 });
  const elementSize = ref({ width: 0, height: 0 });
  const elementPosition = ref({ x: 0, y: 0 });

  const updateMousePosition = (event: MouseEvent) => {
    if (!target.value) return;
    const { left, top, width, height } = target.value.getBoundingClientRect();
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
    isInside.value = mouseX.value >= left && mouseX.value <= left + width && mouseY.value >= top && mouseY.value <= top + height;
    positionInside.value = { x: mouseX.value - left, y: mouseY.value - top };
    elementSize.value = { width, height };
    elementPosition.value = { x: left, y: top };
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition);
  });

  return {
    mouseX,
    mouseY,
    isInside,
    positionInside,
    elementSize,
    elementPosition
  };
}
