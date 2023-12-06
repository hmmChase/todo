import { useApolloClient, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SIGN_OUT } from '@/graphql/queries/user';

function SignOut() {
  const router = useRouter();

  const apolloClient = useApolloClient();

  const [signOut] = useMutation(SIGN_OUT);

  useEffect(() => {
    const signout = async () => {
      await signOut();

      await apolloClient.resetStore();

      router.push('/signin');
    };

    signout();
  }, [apolloClient, signOut, router]);

  return null;
}

export default SignOut;

// import { useApolloClient, useMutation } from '@apollo/client';
// import { useContext, useEffect } from 'react';
// import { useRouter } from 'next/router';

// import { isLoggedInVar } from '@/graphql/cache';
// import { SIGN_OUT } from '@/graphql/queries/user';
// import { UserCtx } from '@/context/User';

// const LogOut = () => {
//   // const { setUser } = useContext(UserCtx);

//   const router = useRouter();

//   const apolloClient = useApolloClient();

//   // const onCompleted = async () => {
//   //   apolloClient.cache.reset();

//   //   setUser(null);

//   //   isLoggedInVar(false);

//   //   router.push('/login');
//   // };

//   const [logOut] = useMutation(SIGN_OUT, {
//     // onCompleted,
//     onError: () => {}
//   });

//   // useEffect(() => {
//   //   const logout = async () => await logOut();

//   //   logout();
//   // }, [logOut]);

//   useEffect(() => {
//     logOut().then(() => {
//       apolloClient.resetStore().then(() => {
//         router.push('/login');
//       });
//     });
//   }, [logOut, router, apolloClient]);

//   return null;
// };

// export default LogOut;
