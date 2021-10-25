import Layout from '../layout';

export default function Home() {
  return (
    <Layout headerSpace={false} transparentAtTop>
      <div className="hero-container">
        <img className="hero__bg" src="/images/hero-bg.jpg" alt="players playing pokemon cards" />
        <header id="hero" className="hero">
          <div className="hero__text">
            <p className="hero__text__big">A platform for Pokémon Card Traders and Buyers in Taiwan</p>
            <p className="hero__text__small">Welcome to 風刀 where standard Pokémon Card prices are updated and maintained.</p>
          </div>
          <object className="hero__logo" type="image/svg+xml" data="/katana-wind-logo-no-bg-animated.svg" alt="logo" />
        </header>
      </div>
      <main className="main">

      </main>
    </Layout>
  )
}
