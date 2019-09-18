import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'antd';

const LinkHome = React.memo(() => (
  <Link href="/">
    <Button type="primary" ghost>
      Home
    </Button>
  </Link>

  // <Button onClick={() => Router.push('/')} type="primary" ghost>
  //   Home
  // </Button>
));

class ErrorPage extends React.PureComponent {
  static getInitialProps({ res, err }) {
    const statusCode = res.statusCode || err.statusCode || null;

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    let response;

    switch (statusCode) {
      case 200:
        break;

      case 404:
        response = (
          <>
            <h3>Page Not Found</h3>

            <LinkHome />
          </>
        );
        break;

      case 500:
        response = (
          <>
            <h3>Internal Server Error</h3>

            <LinkHome />
          </>
        );
        break;

      case true:
        response = (
          <>
            <h3>{`HTTP ${statusCode} Error`}</h3>

            <LinkHome />
          </>
        );
        break;

      default:
        response = (
          <>
            <h3>Unknown error, no status code to report.</h3>

            <LinkHome />
          </>
        );
        break;
    }

    return response;
  }
}

ErrorPage.defaultProps = {
  statusCode: 200
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number
};

export default ErrorPage;
