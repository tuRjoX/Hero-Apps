const getStoredInstalledApps = () => {
  const storedApps = localStorage.getItem("installation");
  if (storedApps) {
    return JSON.parse(storedApps);
  } else {
    return [];
  }
};

export const addToStoredDB = (id) => {
  const installedApps = getStoredInstalledApps();
  if (!installedApps.includes(parseInt(id))) {
    installedApps.push(parseInt(id));
    localStorage.setItem("installation", JSON.stringify(installedApps));
    return true; 
  }
  return false; 
};

export const removeFromDB = (id) => {
  const installedApps = getStoredInstalledApps();
  const index = installedApps.indexOf(parseInt(id));
  if (index > -1) {
    installedApps.splice(index, 1);
    localStorage.setItem("installation", JSON.stringify(installedApps));
    return true; 
  }
  return false; 
};

export const isAppInstalled = (id) => {
  const installedApps = getStoredInstalledApps();
  return installedApps.includes(parseInt(id));
};

export const getInstalledApps = () => {
  return getStoredInstalledApps();
};
