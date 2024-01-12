This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

className 改寫：

```js
// 幫我將 className 的 value 從原本的 "login__tab login__tab--left" 換成 {`${classes.login__tab} ${classes["login__tab--left"]} `} 這種型式

/** 
i.e.
origin:
className="card__bottom-left-round__list-item  card__bottom-left-round__list-item--comparison"

changed:
className={`${classes["card__bottom-left-round__list-item"]} ${classes["card__bottom-left-round__list-item--comparison"]} `}
 */
```

```js
// 幫我改寫 style
// 這是原本的寫法
// ${mobile} {
//     ...
// }
// ${pad} {
//     ...
// }

// 這是改寫後的寫法
// @include mobile {
//     ...
// }
// @include pad {
//     ...
// }
```

```js
//basePath 筆記
/**
 * 1. 這是 next.js 的設定，用來設定專案的根目錄
 * 2. 這個設定會影響到：
 *   1. 你的專案的路由
 *   2. 你的專案的靜態檔案的路徑
 *   3. 你的專案的 api 的路徑
 *
 * 3. 設定位置： next.config.js (同 rewrites 寫 proxy 的設定位置)
 * 4. 結論：
 *  1. 設定 basePath 後，所有只要是有經過自己 server 的呼叫請求，都會被加上 basePath
 *  2. 因此，此時需要搭配 .env 檔案來設計
 *     (不但是為了 next.config.js 本身的設定，也是為了其他地方呼叫 basePath 的設定)
 */

/**
 * .env 設定
 * 1. 不用特別加 ""
 * 2. process.env.[variable] 可以直接取得 .env 裡面的值
 * 3. Next.js will automatically expand variables that use $ to reference other variables
 * e.g.
 * TWITTER_USER=nextjs
 * TWITTER_URL=https://twitter.com/$TWITTER_USER
 *
 * 4. Non-"NEXT_PUBLIC_" environment variables are only available in the Node.js environment
 */

/** 
 * 提醒：什麼情況下，不用理 basePath
 * 
 * 只要在 server components 呼叫的 api
 * 可以直接忽略被預設的 cors 問題，
 * 僅專注在 api 本身的要求上即可。

 * 因為，忽略了 cors 的問題因此不用寫跨域的設定 (proxy)
 * 同時，因為不寫 proxy (不從自己的 server 出發，而是直接呼叫對方的 api url)
 * 所以，可以忽略 basePath 設定後，帶來的調整麻煩。
 * 
 * 而，需要寫 proxy 的，就需要處理 basePath !!
 * e.g. 
 * {
 *    source: "/udn/api/:path*",
 *    destination: "https://udn.com/api/:path*",
 *  },
 * await fetch(`${ROOT}${BASE_PATH}/udn/api/line3?channelId=1005`) 
 * in OverLayMenu
 * 
*/
```

```js
```
