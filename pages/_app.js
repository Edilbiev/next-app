import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import ProfileContext from "../src/ProfileContext";
import Layout from "../components/Layout";
import localData from "../src/localData";

export default function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const defaultProfileData = {
      name: "Иванова Анна Михайловна",
      mail: "aa@yandex.ru",
    };

    try {
      const storageProfileData = localData.get();

      if (storageProfileData !== null) {
        setUserData(JSON.parse(storageProfileData));
      } else {
        //данные по умолчанию
        setUserData(defaultProfileData);
      }
    } catch (e) {
      //данные по умолчанию в случае ошибки с localStorage либо с JSON.parse
      setUserData(defaultProfileData);
    }
  }, [setUserData]);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <ProfileContext.Provider value={{ userData, setUserData }}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProfileContext.Provider>
      </ThemeProvider>
    </>
  );
}
