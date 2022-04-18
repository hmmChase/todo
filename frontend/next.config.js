/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    // ssr and displayName are configured by default
    //? fileName: true,
    //? minify: true,
    //? transpileTemplateLiterals: true,
    //? pure: true
    styledComponents: true
  }
};

module.exports = nextConfig;
