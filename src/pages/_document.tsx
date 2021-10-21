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
            content="Decide how you want your token economy to function."
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://commons-dashboard.netlify.app/"
          />
          <meta property="og:title" content="Commons Config Dashboard" />
          <meta
            property="og:description"
            content="Decide how you want your token economy to function."
          />
          <meta
            property="og:image"
            content="https://commons-dashboard.netlify.app/assets/og_image.jpg"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://commons-dashboard.netlify.app/"
          />
          <meta property="twitter:title" content="Commons Config Dashboard" />
          <meta
            property="twitter:description"
            content="Decide how you want your token economy to function."
          />
          <meta
            property="twitter:image"
            content="https://commons-dashboard.netlify.app/assets/og_image.jpg"
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
