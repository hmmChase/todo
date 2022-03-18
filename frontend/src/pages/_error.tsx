// https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing

import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const LinkHome: NextPage = () => (
  <Link href='/' passHref>
    <button>Home</button>
  </Link>
);

interface Props {
  statusCode: number | boolean;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  const [errorMsg, setErrorMsg] = useState('');

  switch (statusCode) {
    case 404:
      setErrorMsg('Page Not Found');
      break;

    case 500:
      setErrorMsg('Internal Server Error');
      break;

    case true:
      setErrorMsg(`HTTP ${statusCode} Error`);
      break;

    default:
      setErrorMsg('Error');
      break;
  }

  return (
    <div>
      <p>{errorMsg}</p>

      <LinkHome />
    </div>
  );
};

ErrorPage.getInitialProps = ctx => {
  const { res, err } = ctx;

  let statusCode;

  if (res && res.statusCode) statusCode = res.statusCode;
  else if (err && err.statusCode) statusCode = err.statusCode;
  else statusCode = 404;

  return { statusCode };
};

export default ErrorPage;
