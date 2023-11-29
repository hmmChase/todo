import consoleLog from './consoleLog.js';

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
        source: req.headers['x-server'] ? 'server' : 'client',
        operation: req.body.operationName,
        variables: req.body.variables,
        accessToken: !!req.headers.cookie,
        status: res.statusCode,
        data: JSON.parse(Buffer.concat(chunks).toString('utf8')).data,
        errors: JSON.parse(Buffer.concat(chunks).toString('utf8')).errors
        // errorCode: JSON.parse(Buffer.concat(chunks).toString('utf8')).errors[0]
        //   .extensions.code

        // cookies: req.cookies,
        // fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        // headersSent: res.headersSent,
        // host: req.headers.host,
        // method: req.method,
        // originalUri: req.originalUrl,
        // referer: req.headers.referer || ''
        // requestData: req.body,
        // requestHeaders: req.headers,
        // responseHeaders: res.header()._headers,
        // ua: req.headers['user-agent']
        // uri: req.url,
      });
    }

    oldEnd.apply(res, restArgs);
  };

  next();
};

export default myLogger;
