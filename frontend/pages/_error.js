/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkHome = React.memo(() => (
  <Link href="/">
    <a>Home</a>
  </Link>
));

class ErrorPage extends React.PureComponent {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return { statusCode };
  }

  render() {
    let response;

    switch (this.props.statusCode) {
      case 404:
        response = (
          <>
            <h1>Page Not Found</h1>

            <LinkHome />
          </>
        );
        break;

      case 500:
        response = (
          <>
            <h1>Internal Server Error</h1>

            <LinkHome />
          </>
        );
        break;

      case true:
        response = (
          <>
            <h1>HTTP {this.props.statusCode} Error</h1>

            <LinkHome />
          </>
        );
        break;

      default:
        response = (
          <>
            <p>Unknown error, no status code to report.</p>

            <LinkHome />
          </>
        );
        break;
    }

    return response;
  }
}

ErrorPage.defaultProps = {
  statusCode: null
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number
};

export default ErrorPage;
