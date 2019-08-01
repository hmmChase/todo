export default (cache, cookie) =>
  cache.writeData({ data: { isLoggedIn: !!cookie } });
