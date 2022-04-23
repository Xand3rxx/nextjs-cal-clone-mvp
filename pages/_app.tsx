import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { useState } from "react";

import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [confirmationData, setConfirmationData] = useState({});

  return (
    <SessionProvider session={session}>
      <Component
        {...pageProps}
        confirmationData={confirmationData}
        setConfirmationData={setConfirmationData}
      />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
