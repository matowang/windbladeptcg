import Layout from '../layout';

export default function Home() {
  return (
    <Layout headerSpace={false} >
      <main className="main">
        <img className="main__logo" src="/logo.png" alt="logo" />
      </main>
    </Layout>
  )
}
