import type { AppProps } from 'next/app';
import type { NextPage, NextPageWithLayout } from 'next';
import type { ReactElement, ReactNode } from 'react';

// import { User } from "@/models";

// https://nextjs.org/docs/basic-features/layouts#with-typescript
// https://github.com/vercel/next.js/tree/canary/examples/layout-component
// https://dev.to/ofilipowicz/next-js-per-page-layouts-and-typescript-lh5

type GetLayout = (page: ReactElement) => ReactNode;

declare module 'next' {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout;
  };
}

declare module 'next/app' {
  type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout<P>;

    // user: User | null;
  };
}
