export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};