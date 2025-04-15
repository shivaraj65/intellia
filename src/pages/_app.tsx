"use client";

import ThemeWrapper from "@/wrapper/themeWrapper";
import type { AppProps } from "next/app";
import { ConfigProvider, message, App as AntdApp } from "antd";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import theme from "@/styles/theme/themeConfig";
import "@/styles/globals.scss";
import "@/styles/landingpage.scss";
import "@/styles/theme/appTheme.scss";
import "@/styles/theme/antdOverride.scss";
import "@/components/common/gooey-nav/GooeyNav.css";
import "@/components/common/rotating-text/RotatingText.css";
import "@/components/common/scroll-velocity/Scrollvelocity.css";
import "@/components/common/tilted-card/TiltedCard.css";
import "@/components/common/gooey-nav/GooeyNav.css";
import dynamic from "next/dynamic";

const UpProvider = dynamic(() => import("@/wrapper/UpProvider"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  message.config({
    top: 20,
    duration: 2,
    maxCount: 2,
  });

  return (
    <Provider store={store}>
      <UpProvider>
        <ConfigProvider theme={theme}>
          <AntdApp>
            <ThemeWrapper>
              <Component {...pageProps} />
            </ThemeWrapper>
          </AntdApp>
        </ConfigProvider>
      </UpProvider>
    </Provider>
  );
}
