import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import styled, { withTheme } from 'styled-components';

import { siteTitle } from '../../config';
import Header from '../SECTIONS/Header/Header';

const Layout = props => {
  const {
    isLoggedIn,
    onIdeaPage,
    hasHeader,
    hasBackButton,
    children,
    title,
    description,
    fullWidth,
    grid
  } = props;

  // const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : `${siteTitle}`}</title>

        <meta name='description' content={description} />
      </Head>

      {hasHeader && <Header isLoggedIn={isLoggedIn} onIdeaPage={onIdeaPage} />}

      {hasBackButton && (
        <div>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <MainContainer>{children}</MainContainer>
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

/** styled components */

const MainContainer = styled.main`
  /* display: flex; */
  /* justify-content: ${props => (props.grid ? 'center' : 'top')}; */
  /* flex-direction: ${props => (props.grid ? 'row' : 'column')}; */
  /* flex-wrap: wrap; */
  /* align-self: center; */
  /* flex-grow: 1; */
  /* max-width: ${props =>
    props.fullWidth ? null : `${props.theme.widths.regularPageWidth}px`}; */
  /* width: 100%; */
  /* padding: ${props => (props.fullWidth ? 0 : props.theme.unit * 2)}; */
  /* padding-bottom: ${props => props.theme.unit * 5}; */
`;
