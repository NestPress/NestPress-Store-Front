import React, { useEffect } from "react";
import { useRouter } from "next/router";
import client from "helpers/apollo-client";
import { ApolloProvider } from "@apollo/client";
import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { useApp, getFromStore } from "store";

import "styles/index.css";
const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
  props: AppLayoutProps
) => {
  const { Component, pageProps } = props;

  /* set router res to store (way to better implament on standalone apps) */
  const router = useRouter();
  useApp.setState({
    router: Object.assign({}, getFromStore({ store: "router" }), router.query),
  });

  /* routing event use to change store data by routing*/
  useEffect(() => {
    router.asPath === "/" ? router.push("/Page/home") : null;
  }, [router.asPath]);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;

{
  /*<ApolloProvider client={client}>
  <Component {...pageProps} />
  getLayout(<Component {...pageProps} />)
  <Message/>
</ApolloProvider>*/
}

// p-2
// bg-white
// border-t
// border-r
// hover:bg-gray-200
// bg-gray-50
// bg-blue-200
// ml-4
// text-center
// bg-gray-100
// grid
// gap-2
// mt-4
// grid-cols-3
// py-4
// mt-8
// text-gray-500
// font-bold
// mb-8
// col-span-2
// rouded
// mx-20
// mb-20
// block
// mt-20
// text-gray-700
// text-5xl
// p-4
// grid-cols-10
// col-span-5
// justify-end
// w-64
// mb-4
// w-40
// mb-2
// bg-blue-100
// text-gray-600
// m-8
// grid-cols-2
// rounded
// text-xl
// my-3
// mt-2
// flex
// justify-center
// mx-10
// my-20
// flex-wrap
// grid-cols-6
// border-b
// text-xs
// mb-3
// text-3xl
// mx-64
// mb-10
// m-24
// p-8
// gap-6
// text-indigo-500
// grid-cols-4
// m-10
// mt-16
// rounded-md
// p-3
// text-2xl
// my-4
// border-l
// hover:bg-gray-100
// bg-blue-50
// rounded-tl
// gap-4
// items-center
// grid-cols-8
// border
// text-sm
// ml-6
// my-2
// mx-6
// text-white
// invisible
// bg-gray-200
// col-span-3
// p-1
// flex-1
// hover:text-white
// hover:bg-gray-700
// pr-4
// py-2
// justify-between
// bg-blue-500
// col-span-4
// row-span-2
// w-min
// pb-4
// w-3/12
// gap-8
// pl-4
// text-right
// underline
// text-blue-600
// pr-6
// gap-3
// bg-red-300
// row-span-3
// ml-2
// bg-yellow-200
//
// rounded-tr
// bg-pink-600
// mt-6
