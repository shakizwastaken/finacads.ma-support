import "../styles/globals.css";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import { AuthContextProvider } from "../context/auth";
import Head from "next/head";
import { ModalProvider } from "@/context/modal";

const MyApp: AppType = ({ Component, pageProps }) => {
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
