export default function saveAccessToken(access_token: string | null) {
  if (access_token === null) return;
  localStorage.setItem("access_token", access_token);
}
