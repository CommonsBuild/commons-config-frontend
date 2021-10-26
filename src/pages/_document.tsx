import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="title" content="Commons Config Dashboard" />
          <meta
            name="description"
            content="Design a Commons and propose it to the TEC community."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://config.tecommons.org/" />
          <meta property="og:title" content="Commons Config Dashboard" />
          <meta
            property="og:description"
            content="Design a Commons and propose it to the TEC community."
          />
          <meta
            property="og:image"
            content="https://config.tecommons.org/assets/og_image.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://config.tecommons.org/"
          />
          <meta property="twitter:title" content="Commons Config Dashboard" />
          <meta
            property="twitter:description"
            content="Design a Commons and propose it to the TEC community."
          />
          <meta
            property="twitter:image"
            content="https://config.tecommons.org/assets/og_image.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
