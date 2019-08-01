export default (req, res, next) => {
  console.log('\n', '----------');
  console.log('New request', new Date().getMilliseconds());

  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (...restArgs) => {
    chunks.push(Buffer.from(restArgs[0]));
    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }

    const body = Buffer.concat(chunks).toString('utf8');

    req.body.operationName === 'IntrospectionQuery'
      ? console.log('IntrospectionQuery')
      : console.log({
          // time: new Date().toUTCString(),
          // fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          // method: req.method,
          // originalUri: req.originalUrl,
          // requestHeaders: req.headers,
          // responseHeaders: res.header()._headers,
          // statusCode: res.statusCode,
          // host: req.headers.host,
          // headersSent: res.headersSent,
          cookies: req.cookies,
          // uri: req.url,
          requestData: req.body,
          responseData: body
          // referer: req.headers.referer || ''
          // ua: req.headers['user-agent']
        });

    oldEnd.apply(res, restArgs);
  };

  next();
};
