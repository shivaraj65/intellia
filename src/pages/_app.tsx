"use client";

import ThemeWrapper from "@/wrapper/themeWrapper";
import type { AppProps } from "next/app";
import { ConfigProvider, message } from "antd";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import theme from "@/styles/theme/themeConfig";
import "@/styles/globals.scss";
import "@/styles/theme/appTheme.scss";
import "@/styles/theme/antdOverride.scss";
import dynamic from "next/dynamic";

const UpProvider = dynamic(() => import("@/wrapper/UpProvider"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  
  message.config({
    top: 20,
    duration: 2,
    maxCount: 1,
  });

  return (
    <Provider store={store}>
      <UpProvider>
        <ConfigProvider theme={theme}>
          <ThemeWrapper>
            <Component {...pageProps} />
          </ThemeWrapper>
        </ConfigProvider>
      </UpProvider>
    </Provider>
  );
}
