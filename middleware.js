import { NextResponse } from "next/server";

export function middleware(request) {
  // let cookie = request.cookies.get("nextjs");
  // console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }

  const allCookies = request.cookies.getAll();
  console.log("all cookies in mv：", allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: "/try/2nd",
};
