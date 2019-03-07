import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const StyledLayout = styled.div`
  background: #666;
  display: grid;
  max-width: 100vw;
  height: 100vh;
  grid-template-areas:
    'header header header'
    'nav nav nav'
    'main main main'
    'footer footer footer';
  grid-template-rows: 100px 50px 1fr 100px;
  grid-template-columns: 1fr minmax(350px, 1200px) 1fr;

  header {
    grid-area: header;
    background: #cdd472;
  }

  nav {
    grid-area: nav;
    background: #fab272;
  }

  main {
    grid-area: main;
    background: #e7727e;
  }

  footer {
    grid-area: footer;
    background: #96d4d8;
  }

  header,
  nav,
  main,
  footer {
    grid-column-start: 2;
    grid-column-end: span 1;
  }
`;

const StyledMain = styled.main`
  padding: 20px;
`;

const Layout = React.memo(props => (
  <StyledLayout>
    <Header />
    <Nav />
    <StyledMain>
      {/* Pages are rendered here */}
      {props.children}
    </StyledMain>
    <Footer />
  </StyledLayout>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
