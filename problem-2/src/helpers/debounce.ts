export const _debounce = (delay: number = 400) => {
  let timer: number | null = null;

  return (cb: () => void) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(cb, delay);
  };
};
