// import { useEffect } from 'react';
import PropTypes from 'prop-types';
// import Router from 'next/router';
// import { useRouter } from 'next/router';

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
  // const router = useRouter();

  const { data } = useQuery(IS_LOGGED_IN, { onError(_error) {} });

  // useEffect(() => {
  //   data && data.isLoggedIn ? router.push('/') : router.push('/welcome');
  // });

  return data && data.isLoggedIn ? children : 'not signed in';
};

Page.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default React.memo(Page);
