import { cookies } from "next/headers";

export async function GET(request, { params }) {
  //
  const slug = params.slug;
  console.log(
    "called: \n",
    "http://localhost:3006/api/try/cookies/read/" + slug
  );

  if (slug === "all") {
    //way 1.
    //      get all cookies
    const allCookies = request.cookies.getAll();
    console.log("all cookies in api：", allCookies);

    return new Response("Hello! We read all cookies");
  } else {
    //way 2.
    //      get a specific cookie
    const cookieStore = cookies();
    const focusd_cookie_val = cookieStore.get(slug);

    console.log("focusd cookie name: ", slug);
    console.log("focusd cookie value: ", focusd_cookie_val);

    return new Response("Hello! We read a cookie called: " + slug);
  }
}
