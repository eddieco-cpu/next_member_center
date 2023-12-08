import "./globals.scss";

export const metadata = {
  title: "用戶中心｜元氣網",
  description:
    "元氣網作為全台第一大健康媒體，具備最新最即時的健康醫療新知、專業醫療解析以及多元豐富的健康內容，並擁有疾病、養生、減重等多元主題影音及線上課程，以簡單、親近的方式提供專業、正確的醫療照護問題的解決方案與健康知識，同時具有各領域專業醫療從業人員在線諮詢，給予正確的指引與建議。幫助大眾即時獲得醫療新知，及時解答健康疑慮。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="https://health.udn.com/images/favicon.ico"></link>
      <body>{children}</body>
    </html>
  );
}
