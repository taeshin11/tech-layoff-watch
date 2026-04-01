// Search - handles search/filter functionality
const Search = (() => {
  let searchCallback = null;
  let debounceTimer = null;

  function init(inputId, callback) {
    searchCallback = callback;
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (searchCallback) searchCallback(e.target.value.trim());
      }, 300);
    });
  }

  function clear(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = '';
      if (searchCallback) searchCallback('');
    }
  }

  return { init, clear };
})();
