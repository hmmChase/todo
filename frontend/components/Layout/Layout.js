import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SignOn from '../SignOn/SignOn';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import * as Styled from './Layout.style';

const Layout = React.memo(props => (
  // Using styled-components causes the element to rerender everytime
  <Styled.divLayout>
    <Header>
      <SignOn />
    </Header>

    <Nav />

    <Styled.main>
      {/* Pages are rendered here */}
      {props.children}
    </Styled.main>

    <Footer />
  </Styled.divLayout>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
