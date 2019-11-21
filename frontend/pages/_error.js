import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'antd';
import Head from '../components/Head/Head';
import LayoutMain from '../components/LayoutMain/LayoutMain';

const LinkHome = () => (
  <Link href='/'>
    <Button type='primary' ghost>
      Home
    </Button>
  </Link>

  // <Button onClick={() => Router.push('/')} type="primary" ghost>
  //   Home
  // </Button>
);

const Error = React.memo(props => (
  <>
    <Head title='Error' />

    <LayoutMain header={<h1>{props.message}</h1>} content={<LinkHome />} />
  </>
));

Error.propTypes = { message: PropTypes.string.isRequired };

Error.displayName = 'Error';

const ErrorPage = React.memo(props => {
  const { statusCode } = props;

  let error;

  switch (statusCode) {
    case 404:
      error = <Error message='Page Not Found' />;
      break;

    case 500:
      error = <Error message='Internal Server Error' />;
      break;

    case true:
      error = <Error message={`HTTP ${statusCode} Error`} />;
      break;

    default:
      error = <Error message='Error' />;
      break;
  }

  return error;
});

ErrorPage.displayName = 'ErrorPage';

ErrorPage.getInitialProps = props => {
  const { res, err } = props;
  // const statusCode = res.statusCode || err.statusCode || null;

  let statusCode;

  if (res && res.statusCode) {
    statusCode = res.statusCode;
  } else if (err && err.statusCode) {
    statusCode = err.statusCode;
  } else {
    statusCode = null;
  }

  return { statusCode };
};

ErrorPage.defaultProps = { statusCode: null };

ErrorPage.propTypes = { statusCode: PropTypes.number };

export default React.memo(ErrorPage);
