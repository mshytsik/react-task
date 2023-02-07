export const getStorageList = (name) => {
  let values = JSON.parse(localStorage.getItem(name));
  return Array.isArray(values) ? values : [];
};

export const updateStorageList = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
