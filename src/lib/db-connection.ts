/** Remove parâmetros que o driver Neon serverless não suporta. */
export function normalizeNeonUrl(connectionString: string) {
  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  return url.toString();
}
