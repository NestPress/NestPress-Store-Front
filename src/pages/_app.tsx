import React, { ReactNode } from 'react';
import client from "helpers/apollo-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';

import 'styles/index.css';
import { Message } from 'components/layout'
import { mainMenu, rightMenu } from 'blogData/data'

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
  props: AppLayoutProps
) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return( 
      <ApolloProvider client={ client }>
          {getLayout(<Component {...pageProps} />)}
        <Message/>
      </ApolloProvider>

  )
};

export default App;



