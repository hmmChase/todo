// https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing

import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkHome = () => (
  <Link href='/'>
    <button>Home</button>
  </Link>
);

const Error = props => {
  let error;

  switch (props.statusCode) {
    case 404:
      error = 'Page Not Found';
      break;

    case 500:
      error = 'Internal Server Error';
      break;

    case true:
      error = `HTTP ${statusCode} Error`;
      break;

    default:
      error = 'Error';
      break;
  }

  return (
    <div>
      <h1>{error}</h1>

      <LinkHome />
    </div>
  );
};

Error.getInitialProps = ctx => {
  const { res, err } = ctx;

  let statusCode;

  if (res && res.statusCode) statusCode = res.statusCode;
  else if (err && err.statusCode) statusCode = err.statusCode;
  else statusCode = 404;

  return { statusCode };
};

Error.propTypes = { statusCode: PropTypes.number };

export default Error;
