import Layout from '../layout';

import InfoCard from '../components/info-card';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Home() {
  return (
    <Layout headerSpace={false} transparentAtTop>
      <div className="hero-container">
        <header id="hero" className="hero">
          <div className="hero__text">
            <p className="hero__text__big">歡迎來到風刃寶可夢價格資訊站</p>
            <p className="hero__text__small">一個可以讓繁中版寶可夢玩家查卡價，組牌，獲得最新資訊的平台</p>
          </div>
          <object className="hero__logo" type="image/svg+xml" data="/katana-wind-logo-no-bg-animated.svg" alt="logo" />
        </header>
      </div>
      <main className="main main--index">
        <InfoCard button={{
          link: "https://www.facebook.com/windbladeptcg/photos/a.103679938128010/135853681577302/",
          text: <>前往 < FacebookIcon /></>
        }}
          title="價目更新" imgSrc="/images/price-updates/10-9-2021.jpg">
          <p>價目更新</p>
          <p>會慢慢新增隱藏卡片(hr/金道具）</p>
          <p>感謝支持</p>
        </InfoCard>
        <InfoCard button={{
          link: "https://www.facebook.com/windbladeptcg/photos/a.103679938128010/135389408290396/",
          text: <>前往 < FacebookIcon /></>
        }}
          title="劍盾3價目表" imgSrc="/images/price-updates/10-8-2021.jpg">
          <p>劍盾3價目表，目前只有官方公布的卡片，會慢慢更新。</p>
          <p>僅供參考，要是有誤歡迎修正</p>
        </InfoCard>
        <div className="deck-tutorial-card-container">
          <InfoCard variant="large" button={{
            link: "https://www.facebook.com/windbladeptcg/photos/a.103679938128010/114170003745670/",
            text: <>前往 < FacebookIcon /></>
          }}
            title="劍盾2環境的牌組" imgSrc="/images/bug-cards.jpg">
            <p>哈嘍大家好我今天要來跟各位分享一下劍盾2環境的牌組解說了~今天要講的牌組是：泡沫栗鼠噴牌！</p>
          </InfoCard>
        </div>
      </main>
    </Layout>
  )
}
