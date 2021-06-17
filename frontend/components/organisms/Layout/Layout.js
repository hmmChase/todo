import PropTypes from 'prop-types';
import Head from 'next/head';
import { title } from '../../../config';
import * as sc from './Layout.style';

const Layout = props => (
  <>
    <Head>
      <title>{props.title ? `${title} | ${props.title}` : `${title}`}</title>
    </Head>

    <sc.Wrapper>
      <sc.Header>
        <sc.Container>{props.header}</sc.Container>
      </sc.Header>

      <sc.Main>
        <sc.Container>{props.content}</sc.Container>
      </sc.Main>

      <sc.Footer>
        <sc.Container>{props.footer}</sc.Container>
      </sc.Footer>
    </sc.Wrapper>
  </>
);

Layout.propTypes = {
  title: PropTypes.string,
  header: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element
};

export default React.memo(Layout);
