## Getting Started

- 所有的 parallel route 都需要再配置一個 default.js
  為了不匹配的狀況時所準備，不準備會出錯

- 當 intercepting route 寫在某一目錄下時，會在 soft navigation 時，取代該目錄底下同名的子目錄 page.js
  例如:
  ├── track/
  │ ├── (.)author/
  │ │ ├── page.js
  │ ├── author/
  │ │ ├── page.js

此時，
當 soft navigation 到 track/author/ 時，(.)author/ 會取代 author/ 的 page.js
而 hard navigation 則不會

- (.)author 的 (.)，代表的是 "./" 的意思，即:取代同級目錄下的 author

- 當 intercepting route 寫在 parallel route 目錄下時，是使用 (.) 而不是 (..)
  官方說法: `since @modal is a slot and not a segment.`
  例如:
  ├── track/
  │ ├── @modal/
  │ │ ├── default.js
  │ │ ├── (.)author/
  │ │ │ ├── page.js
  │ ├── author/
  │ │ ├── page.js
