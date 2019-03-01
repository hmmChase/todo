import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

class Layout extends React.PureComponent {
  render() {
    return (
      <>
        <Header>
          <Nav />
        </Header>
        <main>
          {/* Pages are rendered here */}
          {this.props.children}
        </main>
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
