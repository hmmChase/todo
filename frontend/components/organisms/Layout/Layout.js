import PropTypes from 'prop-types';
import Footer from '../../molecules/Footer/Footer';
import * as sc from './Layout.style';

const Layout = props => (
  <sc.Wrapper>
    <sc.Header>
      <sc.Container>{props.header}</sc.Container>
    </sc.Header>

    <sc.Main>
      <sc.Container>{props.content}</sc.Container>
    </sc.Main>

    <sc.Footer>
      <sc.Container>
        <Footer />
      </sc.Container>
    </sc.Footer>
  </sc.Wrapper>
);

Layout.propTypes = {
  header: PropTypes.element,
  content: PropTypes.element
};

export default React.memo(Layout);
