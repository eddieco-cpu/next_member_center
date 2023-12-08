export function GET(req) {
  //
  console.log("@@@ req @@@ \n", req.headers.referer);

  // const url = new URL(request.url);
  // return Response.json({ url });

  let referer = req.headers.referer || null;

  if (referer) {
    referer = new URL(referer);
  }
  return Response.json({ url: referer });
}
