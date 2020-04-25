import PropTypes from 'prop-types';
// import Router from 'next/router';

import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../graphql/queries';

// const { loading, error, data } = useQuery(IS_LOGGED_IN, {
//   variables: { hi: 'asdf' },
// });

// const { loading, error, data } = useQuery(IS_LOGGED_IN, {
//   variables: { hi: 'asdf' },
// });

// console.log('IndexPage -> loading', loading);
// console.log('IndexPage -> error', error);
// console.log('IndexPage -> data', data);

const Page = ({ children }) => {
  const { data } = useQuery(IS_LOGGED_IN);

  return data && data.isLoggedIn ? children : children;

  // Router.push('/welcome')
};

Page.propTypes = { children: PropTypes.arrayOf(PropTypes.element) };

export default Page;
