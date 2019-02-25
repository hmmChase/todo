import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Layout extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
