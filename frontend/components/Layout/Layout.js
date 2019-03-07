import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Layout = React.memo(props => (
  <>
    {/* Prevent first element from pointlessly rerendering */}
    <div style={{ display: 'none' }} />
    <Header />
    <Nav />
    <main>
      {/* Pages are rendered here */}
      {props.children}
    </main>
    <Footer />
  </>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
