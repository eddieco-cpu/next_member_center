import { cookies } from "next/headers";

export async function GET() {
  console.log("called: \n", "http://localhost:3006/api/try/cookies/add/more");
  cookies().set("is-jon-cool", "absolutely");
  return new Response("working");
}
