// https://dev.to/ofilipowicz/next-js-per-page-layouts-and-typescript-lh5


import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type GetLayout = (page: ReactElement) => ReactNode;

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & { getLayout?: GetLayout };

declare module 'next/app' {
  type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout<P>
  }
}


// import type {
//   NextPage,
//   NextLayoutComponentType,
//   NextComponentType,
//   NextPageContext,
// } from 'next';
// import type { AppProps } from 'next/app';

// type GetLayout = (page: ReactElement) => ReactNode;

// // type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & { getLayout?: GetLayout };

// declare module 'next' {
//   type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
//     getLayout?: GetLayout;
//   };
// }

// declare module 'next/app' {
//   type AppLayoutProps<P = {}> = AppProps & {
//     Component: NextLayoutComponentType;
//   };
// }

