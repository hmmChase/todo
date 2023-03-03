// https://nextjs.org/docs/basic-features/typescript#type-checking-nextconfigjs

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true
  }

  // experimental: { appDir: true }

  // serverRuntimeConfig: {
  //   mySecret: 'secret'
  // },

  // publicRuntimeConfig: {
  //   message: 'notice how serverRuntimeConfig is empty'
  // }
};

module.exports = nextConfig;
