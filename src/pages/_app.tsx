import React, { ReactNode } from "react";
import client from "helpers/apollo-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import "styles/index.css";
const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
  props: AppLayoutProps
) => {
  const { Component, pageProps } = props;
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;

{/*<ApolloProvider client={client}>
  <Component {...pageProps} />
  getLayout(<Component {...pageProps} />)
  <Message/>
</ApolloProvider>*/}