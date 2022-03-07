// https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing

import { FC, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const LinkHome: FC = () => (
  <Link href='/'>
    <button>Home</button>
  </Link>
);

interface Props {
  statusCode: number | boolean;
}

type State = {
  error: string;
};

const ErrorPage: NextPage<Props> = props => {
  const { statusCode } = props;

  const { error, setError } = useState<State>('');

  switch (statusCode) {
    case 404:
      setError('Page Not Found');
      break;

    case 500:
      setError('Internal Server Error');
      break;

    case true:
      setError(`HTTP ${statusCode} Error`);
      break;

    default:
      setError('Error');
      break;
  }

  return (
    <div>
      <h1>{error}</h1>

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
