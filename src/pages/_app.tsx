import ThemeWrapper from "@/wrapper/themeWrapper";
import type { AppProps } from "next/app";
import { ConfigProvider, message } from "antd";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import theme from "@/styles/theme/themeConfig";
import "@/styles/globals.scss";
import "@/styles/theme/appTheme.scss";
import "@/styles/theme/antdOverride.scss";

export default function App({ Component, pageProps }: AppProps) {
  message.config({
    top: 20,
    duration: 2,
    maxCount: 2,
  });

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </ConfigProvider>
    </Provider>
  );
}
