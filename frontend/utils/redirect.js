import Router from 'next/router';

export default (res, target) => {
  if (res) {
    // server
    // 303: "See other"
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
