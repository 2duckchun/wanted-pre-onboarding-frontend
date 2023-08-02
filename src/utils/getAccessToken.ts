export default function getAccessToken() {
  const access_token = localStorage.getItem("access_token");
  console.log(access_token);
  if (access_token) {
    return access_token;
  }
  return "";
}
