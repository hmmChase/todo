import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import styled, { withTheme } from 'styled-components';

import { siteTitle } from '../../config';
import Header from '../SECTIONS/Header/Header';
import useWindowSize from '../../utils/useWindowSize';
import mq from '../../utils/mediaQuery';

const Layout = props => {
  const {
    home,
    header,
    children,
    title,
    description,
    isLoggedIn,
    fullWidth,
    grid
  } = props;

  const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>

        <meta name='description' content={description} />
      </Head>

      {header && (
        <HeaderContainer totalWidth={width}>
          <Header isLoggedIn={isLoggedIn} />
        </HeaderContainer>
      )}

      {!home && (
        <div>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <MainContainer fullWidth={fullWidth} grid={grid}>
        {children}
      </MainContainer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ]),
  title: PropTypes.string,
  theme: PropTypes.object
};

export default withTheme(Layout);

/** styles **/

const HeaderContainer = styled.header(props => ({
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'center',
  width: '100%',
  maxWidth: props.theme.widths.largePageWidth,
  // 60 below removes 3 * 20 horizontal paddings (sides and inner between player and list)
  height: ((props.totalWidth - 60) * (2 / 3)) / (16 / 9),
  maxHeight: (props.theme.widths.largePageWidth * (2 / 3)) / (16 / 9),
  ':hover': {
    backgroundColor: props.theme.colors.grey
  },

  [mq[0]]: {
    width: '90%'
  },

  [mq[1]]: {
    width: '47%'
  },

  [mq[2]]: {
    width: '31%'
  }
}));

const MainContainer = styled.main`
  display: flex;
  justify-content: ${props => (props.grid ? 'center' : 'top')};
  flex-direction: ${props => (props.grid ? 'row' : 'column')};
  flex-wrap: wrap;
  align-self: center;
  flex-grow: 1;
  max-width: ${props =>
    props.fullWidth ? null : `${props.theme.widths.regularPageWidth}px`};
  width: 100%;
  padding: ${props => (props.fullWidth ? 0 : props.theme.unit * 2)};
  padding-bottom: ${props => props.theme.unit * 5};
`;
