export default (req, res, next) => {
  console.log('\n', '----------');
  console.log('New request', new Date().getMilliseconds());

  // console.log('req host: ', req.headers.host);
  // console.log('req headers: ', req.headers);
  // console.log('req cookies: ', req.cookies);
  console.log('req body: ', req.body);
  // console.log('res headers : ', res.header()._headers);
  // console.log('res statusCode: ', res.statusCode);
  // console.log('headersSent: ', res.headersSent);

  // Response Body
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
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));

    body.forEach(data => console.log('res body: ', data));

    oldEnd.apply(res, restArgs);
  };

  next();
};
