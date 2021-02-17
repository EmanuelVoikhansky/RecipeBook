/**
 * Creates a higher order function based on the input that will only fire once
 * evern *wait* ms. The final set of inputs before the timeout is triggered will
 * be the ones used
 **/

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
