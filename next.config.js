/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/health/css/:path*", // 捕捉所有以 /health/css 開頭的請求
        destination: "https://health.udn.com/css/:path*", // 將這些請求重定向到這個目標地址
      },
      {
        source: "/health/api/:path*", // 捕捉所有以 /health/api 開頭的請求
        destination: "https://health.udn.com/api/:path*", // 將這些請求重定向到這個目標地址
      },
    ];
  },
};

module.exports = nextConfig;
