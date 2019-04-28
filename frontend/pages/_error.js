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
            <h3>HTTP {this.props.statusCode} Error</h3>

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
  statusCode: null
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number
};

export default ErrorPage;
