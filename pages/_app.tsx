import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NativeBaseProvider } from "native-base";

//My Context
import { ResultContextProvider } from "../src/contexts/resultContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ResultContextProvider>
      <NativeBaseProvider>
        <Component {...pageProps} />
      </NativeBaseProvider>
    </ResultContextProvider>
  );
}

export default MyApp;
