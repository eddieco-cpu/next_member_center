export function redirectHandler(redirectURI) {
  //
  function redirect(url) {
    window.location.href = decodeURIComponent(url);
  }

  if (redirectURI) {
    process.env.NODE_ENV === "development"
      ? redirect(redirectURI)
      : /.udn.com/.test(redirectURI) && redirect(redirectURI);
  } else {
    const origin = window.location.origin;
    window.location.href = origin + "/member/user";
  }
}

export function convertCookieObjArrayToString(arr) {
  return arr.map((obj) => `${obj?.name}=${obj?.value}`).join(";");
}

export function doWait(times = 200) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, times * 1);
  });
}

export function isPositiveInteger(value) {
  return /^[1-9]\d*$/.test(String(value));
}
