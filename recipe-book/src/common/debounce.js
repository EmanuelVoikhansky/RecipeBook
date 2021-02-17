/**
 * Creates a higher order function based on the input that will only fire once
 * evern *wait* ms. The final set of inputs before the timeout is triggered will
 * be the ones used
 **/
export default function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
