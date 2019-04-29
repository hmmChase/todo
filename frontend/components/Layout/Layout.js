import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SignOn from '../SignOn/SignOn';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import * as sc from './Layout.style';

const Layout = React.memo(props => (
  // Using styled-components causes the element to rerender everytime

  <sc.divLayout>
    <Header>
      <SignOn />
    </Header>

    <Nav />

    <sc.main>
      {/* Pages are rendered here */}
      {props.children}
    </sc.main>

    <Footer />
  </sc.divLayout>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
