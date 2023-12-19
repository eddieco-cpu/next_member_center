export async function GET() {
  //
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let rightNowCookie = `${hours}:${minutes}:${seconds}`;

  //
  console.log("set a cookie -> rightNowCookie: ", rightNowCookie);

  return new Response("Hello! We set a cookie called: rightNowCookie", {
    status: 200,
    headers: { "Set-Cookie": `rightNowCookie=${rightNowCookie}` },
  });
}
