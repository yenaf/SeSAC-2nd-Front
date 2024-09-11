function debounce(callback, timeout = 100) {
  let cleanup = null;
  return (e) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, e), timeout);
  };
}

export default debounce;
