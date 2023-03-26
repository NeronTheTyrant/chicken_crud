export function getApiUrl(): string {
  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === "127.0.0.1") {
    return `http://${hostname}:4000`;
  }
  return `https://api.${hostname}`;
}
