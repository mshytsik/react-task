const mockLocalStorage = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    populate() {
      store.recipes =
        '[{"id": 862993, "name": "Roasted Eggplant With Tahini"}]';
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

export default window.localStorage;
