"use client";

import { getData } from "@utils/api";

//
async function addOneCookies() {
  const { data } = await getData("http://localhost:3006/api/try/cookies/add");
  console.log("data: ", data);
}

async function readAllCookies() {
  const { data } = await getData(
    "http://localhost:3006/api/try/cookies/read/all"
  );
  console.log("data: ", data);
}

async function readOneCookie() {
  const { data } = await getData(
    "http://localhost:3006/api/try/cookies/read/rightNowCookie"
  );
  console.log("data: ", data);
}

//
export default function Test() {
  return (
    <div style={{ outline: "1px solid #ccc", width: "45%", padding: "10px" }}>
      <p style={{ padding: "10px" }}>
        <button
          onClick={addOneCookies}
          style={{ padding: "10px", border: "1px solid #ccc" }}
        >
          1. set a cookie - rightNowCookie
        </button>
      </p>
      <p style={{ padding: "10px" }}>
        <button
          onClick={readOneCookie}
          style={{ padding: "10px", border: "1px solid #ccc" }}
        >
          2. read a Cookies - rightNowCookie
        </button>
      </p>
      <p style={{ padding: "10px" }}>
        <button
          onClick={readAllCookies}
          style={{ padding: "10px", border: "1px solid #ccc" }}
        >
          3. Read All Cookies
        </button>
      </p>
    </div>
  );
}
