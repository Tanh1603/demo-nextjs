import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const host = (await headers()).get("host");
  if (!host) throw new Error("Cannot determine host");

  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
