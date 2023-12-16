import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import classes from "./page.module.scss";

const notice_info = [
  '「線上影音課程」(以下簡稱本服務)屬於線上數位內容服務，若有提供用戶免費試閱內容，您認知並同意不適用消費者保護法第十九條第一項七天猶豫期間解約權之規定（依據「通訊交易解除權合理例外情事適用準則」第二條），一旦訂購完成，即恕不接受退款。',
  '本服務提供部分數位內容免費試閱的服務，購買前請務必先行試閱，確認該數位內容符合您的需求後方行購買。',
  '本服務若未提供用戶免費試閱內容，依據「網際網路教學服務定型化契約應記載事項」第十八條規定「定期定額返還」方式退款，自您購買本服務之日起十日內申請退款，本網站將全額退款；逾十日，本網站不予退款。您須自行負擔退款手續費用及已寄送之實體商品費用，本網站得於退款金額中扣除。',
  '「線上影音課程」內容，講師均以影像錄製當下之相關醫學科技及經驗為授課內容，請您認知與諒解內容所涉及之相關醫學科技資訊及講師經驗會不斷修正或更迭，無法確保為您觀看時最新、正確且完整之內容。如您有實際案例或問題，強烈建議您應尋求專業人士協助，本內容僅供您為學習或參考之用（如因故須終止內容提供，將無法繼續使用本服務）。本網站就本內容不負任何擔保或保證責任。',
  '	本服務提供為數位商品，您僅能透過您購買時所登入之會員帳戶使用本服務，若您的會員帳戶因故終止者，將無法繼續使用本服務。本服務目前無法離線狀態使用，使用前先確認電子設備是否已順利連上網路。您不得以未登入使用或其他類似事由主張退費或延長服務期間，或要求將本服務數位商品移轉至其他會員帳戶。除另有約定之實體贈品外，您不會收到實體商品。',
  '「限時優惠價」僅適用於同帳戶於優惠期間購買並扣款者，若取消訂單後於非優惠期間選擇重新購買，恢復原定價格，不再享有優惠。 ',
  '	若您選擇以「信用卡」作為付款方式，您知悉並同意「聯合報股份有限公司」為提供「本課程服務所需之目的」，包括但不限於提供課程服務、寄送發票等，得於「您購買本服務之期間及其後一年內」，蒐集、處理及利用您的會員資料、訂購時所填寫之資料、信用卡授權相關資料。您並了解您依照個人資料保護法所享有的權利及權利行使的方式，均詳載於聯合報系(udngroup.com)隱私權聲明且您已確實閱讀。',
  '更多資訊可參考元氣網「<a href="https://member.udn.com/member/rule.jsp" target="_blank">線上影音課程</a>」專屬條款。',
  '若有關於「元氣網 線上影音課程」任何其他問題，請洽 udnhealthservice@udngroup.com 或撥打客服電話 (02)2649-1681 分機 8；客戶服務中心服務時間：週一到週日 09:00-18:00（台灣）。'
]

export default function Page() {
  return (
    <main className="page_body">
      <Container className={`${classes.rights__page} small`}>
        <PageTitle>注意事項</PageTitle>
        <div className={classes.rights__container}>
        <ul className={classes.rights__list}>
          {notice_info.map((item, index) => (
            <li key={index} className={classes.rights__text} dangerouslySetInnerHTML={{ __html: item }}/>
          ))}
        </ul>
        </div>
      </Container>
      <PageDevName>rights</PageDevName>
    </main>
  );
}
