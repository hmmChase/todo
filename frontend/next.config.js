/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    // ssr and displayName are configured by default
    styledComponents: true
    // fileName: true,
    // minify: true,
    // transpileTemplateLiterals: true,
    // pure: true
  }

  // serverRuntimeConfig: {
  //   mySecret: 'secret'
  // },

  // publicRuntimeConfig: {
  //   message: 'notice how serverRuntimeConfig is empty'
  // }
};

module.exports = nextConfig;
