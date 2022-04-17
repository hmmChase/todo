export const consoleLog = stuff =>
  console.log(
    '------------------------------',
    '\n',
    stuff,
    '\n',
    '------------------------------'
  );

const myLogger = (req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (...restArgs) => {
    chunks.push(Buffer.from(restArgs[0]));

    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) chunks.push(Buffer.from(restArgs[0]));

    if (req.body.operationName !== 'IntrospectionQuery') {
      consoleLog({
        time: new Date().toUTCString(),
        operationName: req.body.operationName,
        variables: req.body.variables,
        'access cookie': req.headers.cookie,
        'server-side req': !!req.headers['x-server']

        // cookies: req.cookies,
        // fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        // headersSent: res.headersSent,
        // host: req.headers.host,
        // method: req.method,
        // originalUri: req.originalUrl,
        // referer: req.headers.referer || ''
        // requestData: req.body,
        // requestHeaders: req.headers,
        // responseData: Buffer.concat(chunks).toString('utf8'),
        // responseHeaders: res.header()._headers,
        // statusCode: res.statusCode,
        // ua: req.headers['user-agent']
        // uri: req.url,
      });
    }

    oldEnd.apply(res, restArgs);
  };

  next();
};

export default myLogger;
