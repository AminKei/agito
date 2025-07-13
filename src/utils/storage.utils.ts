const CacheKeys = Object.freeze({
  theme: "theme",
  menus: "menus",
  token: "token",
  refresh: "refresh",
  user: "user",
});

export const cacheUser = (user: any) => {
  localStorage.setItem(CacheKeys.token, user.accessToken);
  localStorage.setItem(CacheKeys.user, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(CacheKeys.token);
  localStorage.removeItem(CacheKeys.user);
};

export const getCachedUser = (): any | null => {
  const cachedUser = localStorage.getItem(CacheKeys.user);
  if (!cachedUser) return null;
  return JSON.parse(cachedUser) as any;
};

export const getCurrentTheme = (): any => {
  const theme = localStorage.getItem(CacheKeys.theme);
  return (theme as any) || "light";
};

export const setCurrentTheme = (theme: any) => {
  localStorage.setItem(CacheKeys.theme, theme);
};
