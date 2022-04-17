// Not used

// import { useState, useEffect } from 'react';

// export const fetchUser = async (cookie = '') => {
//   if (typeof window !== 'undefined' && window.__user) return window.__user;

//   const res = await fetch('/api/me', cookie ? { headers: { cookie } } : {});

//   if (!res.ok) {
//     delete window.__user;

//     return null;
//   }

//   const data = await res.json();

//   if (typeof window !== 'undefined') window.__user = data;

//   return data;
// };

// export const useFetchUser = async ({ required } = {}) => {
//   const [loading, setLoading] = useState(
//     () => !(typeof window !== 'undefined' && window.__user)
//   );

//   const [user, setUser] = useState(() => {
//     if (typeof window === 'undefined') return null;

//     return window.__user || null;
//   });

//   useEffect(
//     () => {
//       if (!loading && user) return;

//       setLoading(true);

//       let isMounted = true;

//       fetchUser().then(user => {
//         // Only set the user if the component is still mounted
//         if (isMounted) {
//           // When the user is not logged in but login is required
//           if (required && !user) {
//             window.location.href = '/api/login';

//             return;
//           }

//           setUser(user);
//           setLoading(false);
//         }
//       });

//       return () => (isMounted = false);
//     },

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return { user, loading };
// };

// // import { useFetchUser } from '../lib/user'
// // const { user, loading } = useFetchUser();
// // const { user, loading } = useFetchUser({ required: true });
