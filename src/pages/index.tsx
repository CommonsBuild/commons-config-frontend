import Head from 'next/head';

import { Navbar } from '@/components/Navbar';

function Home() {
  return (
    <>
      <Head>
        <title>Commons Config Dashboard</title>
      </Head>
      <Navbar />
    </>
  );
}

export default Home;
