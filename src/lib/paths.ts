export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
}

export function withBasePath(path: string) {
  const base = getBasePath();
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleaned}`;
}
