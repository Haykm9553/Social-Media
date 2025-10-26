export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getUrl = () => {
  return "http://localhost:8000"
}