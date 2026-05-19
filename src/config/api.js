export const BASE_URL =
  "https://vdncosmetics.com";

export const API_URL =
  `${BASE_URL}/api`;
  
export const getImageUrl = (path) => {
  if (!path) return "";

  return path.startsWith("http")
    ? path
    : `${BASE_URL}/${path}`;
};
