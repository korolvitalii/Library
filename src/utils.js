const setLocalStorageData = (key, data = []) => {
  const raw = JSON.stringify(data);
  localStorage.setItem(key, raw);
};

const getLocalStorageData = (key) => {
  const raw = localStorage.getItem(key);
  return JSON.parse(raw) || [];
};

export { setLocalStorageData, getLocalStorageData };
