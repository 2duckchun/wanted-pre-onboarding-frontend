export default function getAccessToken() {
  const AccessToken = localStorage.getItem("access_token");
  if (AccessToken) {
    return true;
  }
  return false;
}
