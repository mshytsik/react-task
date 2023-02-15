export const getStorageList = (name) => {
  let values = localStorage.getItem(name);
  if (values === undefined) {
    return [];
  }
  values = JSON.parse(values);
  return Array.isArray(values) ? values : [];
};

export const updateStorageList = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
