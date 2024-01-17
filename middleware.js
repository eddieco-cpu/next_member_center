import { NextResponse } from "next/server";

/** 
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
*/

export function middleware(request) {
  //
  let udnmember = request.cookies.get("udnmember");
  let udnland = request.cookies.get("udnland");
  let udngold = request.cookies.get("udngold");
  let um2 = request.cookies.get("um2");

  //
  const pathnameNeedMemberCookies =
    request.nextUrl.pathname.startsWith("/user") ||
    request.nextUrl.pathname.startsWith("/order") ||
    request.nextUrl.pathname.startsWith("/collection") ||
    request.nextUrl.pathname.startsWith("/track") ||
    request.nextUrl.pathname.startsWith("/retirement");

  //
  switch (true) {
    case request.nextUrl.pathname === "/":
      return NextResponse.redirect(new URL("/member/user", request.url));

    case request.nextUrl.pathname.startsWith("/try/2nd"):
      const allCookies = request.cookies.getAll();
      console.log("all cookies in mv：", allCookies); // => [{ name: 'nextjs', value: 'fast' }]
      break;

    case request.nextUrl.pathname.startsWith("/login"):
      if (udnmember && udnland && udngold && um2) {
        return NextResponse.redirect(new URL("/member/user", request.url));
      }
      break;

    case pathnameNeedMemberCookies:
      if (!udnmember || !udnland || !udngold || !um2) {
        //
        request.cookies.delete("udnmember");
        request.cookies.delete("udnland");
        request.cookies.delete("udngold");
        request.cookies.delete("um2");

        //
        const parsedUrl = new URL(request.url);
        const pathname = parsedUrl.pathname || "";
        const hash = parsedUrl.hash || "";
        const search = parsedUrl.search || "";
        const redirectQuery = encodeURIComponent(pathname + hash + search);

        return NextResponse.redirect(
          new URL(`/member/login?redirect=${redirectQuery}`, request.url)
        );
      }
      break;

    default:
      return NextResponse.next();
  }

  return NextResponse.next();
}
