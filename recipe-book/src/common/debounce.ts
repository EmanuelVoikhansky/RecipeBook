/**
 * Creates a higher order function based on the input that will only fire once
 * evern *wait* ms. The final set of inputs before the timeout is triggered will
 * be the ones used
 **/

const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): ((...args: Args) => void) => {
  let timeout: number | undefined;

  return function executedFunction(...args: Args) {
    const later = () => {
      window.clearTimeout(timeout);
      func(...args);
    };

    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
};

export default debounce;
