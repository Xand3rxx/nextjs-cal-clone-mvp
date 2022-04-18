import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
