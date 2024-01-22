/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

console.log("@@@ basePath @@@ ", basePath);
console.log("@@@ process.env.ROOT @@@ ", process.env.NEXT_PUBLIC_ROOT);

const nextConfig = {
  basePath,
  async rewrites() {
    return [
      // {
      //   source: "/health/css/:path*", // 捕捉所有以 /health/css 開頭的請求
      //   destination: "https://health.udn.com/css/:path*", // 將這些請求重定向到這個目標地址
      // },
      // {
      //   source: "/health/api/:path*", // 捕捉所有以 /health/api 開頭的請求
      //   destination: "https://health.udn.com/api/:path*", // 將這些請求重定向到這個目標地址
      // },
      // {
      //   source: "/health/js/:path*",
      //   destination: "https://health.udn.com/js/:path*",
      // },
      {
        source: "/udn/api/:path*",
        destination: "https://udn.com/api/:path*",
      },
      {
        source: "/do/:path*",
        destination: "https://health-feg.udn.com/do/:path*", //雖然 feg 可以接收，但是為了被種植的 cookie domain ，還是要設 proxy
      },
      {
        source: "/api/member/teachify",
        destination: "https://lab7-health.udn.com/api/member/teachify",
      },
      {
        source: "/api/track/switch",
        destination: "https://interactive.udn.com/api/track/switch",
      },
      {
        source: "/api/track/expert/:path*",
        destination: "https://lab7-health.udn.com/api/track/expert/:path*",
      },
      {
        source: "/api/expert/:path*",
        destination: "https://lab7-health.udn.com/api/expert/:path*",
      },
      {
        source: "/api/collect/switch",
        destination: "https://interactive.udn.com/api/collect/switch",
      },
      {
        source: "/api/notification/:path*",
        destination: "https://interactive.udn.com/api/notification/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
