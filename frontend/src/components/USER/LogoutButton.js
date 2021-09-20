import styled from 'styled-components';
import { useApolloClient } from '@apollo/client';

// import { isLoggedInVar } from '../../graphql/cache';

const LogoutButton = () => {
  const client = useApolloClient();

  const handleClick = () => {
    // Since we're logging out, remove all traces of the current user
    // from the cache. First use `cache.evict()` to remove the stored
    // `me` reference that was added to the cache by the `GET_MY_TRIPS`
    // query in `profile.tsx`. Then trigger garbage collection using
    // `cache.gc()` to remove the cached `User` object that is no longer
    // reachable.
    // client.cache.evict({ fieldName: 'me' });
    // client.cache.gc();
    // client.clearStore();
    // client.resetStore();
    // client.cache.reset();
    // client.cache.writeQuery({
    //   id: 'isLoggedIn',
    //   query: IS_LOGGED_IN,
    //   data: { isLoggedIn: false }
    // });
    // Remove user details from localStorage.
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    // Let other parts of the application that are relying on logged in
    // state know we're now logged out.
    // isLoggedInVar(false);
  };

  return (
    <StyledButton data-testid='logout-button' onClick={handleClick}>
      Logout
    </StyledButton>
  );
};

export default LogoutButton;

/** styled components */

const StyledButton = styled.button`
  background: 'none';
  border: 'none';
  padding: 0;
`;
