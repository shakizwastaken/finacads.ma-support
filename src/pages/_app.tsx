import "../styles/globals.css";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import { AuthContextProvider } from "../context/auth";
import Head from "next/head";
import { ModalProvider } from "@/context/modal";
import { useEffect } from "react";
import Router from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data: didOnboard } = api.auth.checkOnboarding.useQuery();

  useEffect(() => {
    if (!didOnboard) {
      Router.push("/onboard");
    }
  }, [didOnboard]);

  return (
    <AuthContextProvider>
      <ModalProvider>
        <Head>
          <title>Support finacards</title>
          <meta
            name="description"
            content="Support section and ticketing system for Finacards.ma"
          />
          <link rel="icon" href="/assets/logo.png" />
        </Head>

        <main className="app">
          <Component {...pageProps} />
        </main>
      </ModalProvider>
    </AuthContextProvider>
  );
};

export default api.withTRPC(MyApp);
