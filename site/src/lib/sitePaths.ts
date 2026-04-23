export function toSitePath(path: string) {
  if (path === "/") {
    return import.meta.env.BASE_URL;
  }

  const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${trimmedPath}`;
}
