import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';

// https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing

// new
// interface ErrorProps {
//   statusCode: number;
// }

// function Error({ statusCode }: ErrorProps) {
//   return (
//     <p>
//       {statusCode
//         ? `An error ${statusCode} occurred on server`
//         : 'An error occurred on client'}
//     </p>
//   );
// }

// Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
//   const statusCode: number = res ? res.statusCode : err ? err.statusCode : 404;

//   return { statusCode };
// };

// export default Error;

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
