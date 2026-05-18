export const BASE_URL =
  "https://green-buffalo-260842.hostingersite.com";

export const API_URL =
  `${BASE_URL}/api`;
  
export const getImageUrl = (path) => {
  if (!path) return "";

  return path.startsWith("http")
    ? path
    : `${BASE_URL}/${path}`;
};