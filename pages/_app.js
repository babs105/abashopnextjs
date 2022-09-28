import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import LayoutAdmin from "../components/layouts/LayoutAdmin";
import RouteGuard from "../components/RouteGuard";

// Import toastify css files
import "react-toastify/dist/ReactToastify.css";
// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();
// const layouts = {
//   L1: LayoutSiderBar,
// };
export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  // s
  // const Layout = (children) => <>{children}</>;

  React.useEffect(() => {
    console.log("IN APPP ROOT");
  }, []);

  // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ABA.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {Component.auth ? (
            <>
              {Component.layout === "profile" ? (
                <LayoutAdmin>
                  <RouteGuard>
                    <Component {...pageProps} />
                  </RouteGuard>
                </LayoutAdmin>
              ) : (
                <RouteGuard>
                  <Component {...pageProps} />
                </RouteGuard>
              )}
            </>
          ) : (
            <>
              <Component {...pageProps} />
            </>
          )}
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
