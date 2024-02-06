import { ref, onMounted, onUnmounted } from 'vue';

const defaultBreakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400
};

type Breakpoints = {
  [key: string]: number;
};

/*
 * @description: This composable is used to detect the current active breakpoint from a given set of breakpoints.
 * you can also pass custom breakpoints.
 * @param breakpoints
 */
export function useBreakpoints(breakpoints: Breakpoints = defaultBreakpoints) {
  const keys = Object.keys(breakpoints).reverse();
  const values = Object.values(breakpoints).reverse();

  const getBreakpoint = (width: number) => {
    const index = values.findIndex(value => width >= value);
    return index !== -1 ? keys[index] : keys[keys.length - 1];
  };

  const width = ref(0);
  const breakpoint = ref(getBreakpoint(width.value));

  const handleResize = () => {
    width.value = window.innerWidth;
    breakpoint.value = getBreakpoint(width.value);
  };

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  const greaterThan = (breakpointName: string) => {
    const breakpointIndex = keys.indexOf(breakpointName);
    return breakpointIndex > -1 ? values[breakpointIndex] <= width.value : false;
  }

  const lessThan = (breakpointName: string) => {
    const breakpointIndex = keys.indexOf(breakpointName);
    return breakpointIndex > -1 ? values[breakpointIndex] > width.value : false;
  }

  const equalTo = (breakpointName: string) => {
    return breakpoint.value === breakpointName;
  }

  const between = (min: string, max: string) => {
    return greaterThan(min) && lessThan(max);
  }

  const greaterThanOrEqual = (breakpointName: string) => {
    return greaterThan(breakpointName) || equalTo(breakpointName);
  }

  const lessThanOrEqual = (breakpointName: string) => {
    return lessThan(breakpointName) || equalTo(breakpointName);
  }

  return {
    width,
    breakpoint,
    greaterThan,
    lessThan,
    equalTo,
    between,
    greaterThanOrEqual,
    lessThanOrEqual
  };
}
