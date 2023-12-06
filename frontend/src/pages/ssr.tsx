// import { addApolloState, initializeApollo } from '@/graphql/apolloClient';
// import { gql, NetworkStatus, useMutation, useQuery } from '@apollo/client';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// import { CREATE_TASK, READ_TASKS, UPDATE_TASK } from '@/graphql/queries/task';

const SSRPage = () => {
  return <div>SSR</div>;
};

export default SSRPage;

// // const ALL_TASKS_QUERY = gql`
// //   query allTasks($first: Int!, $skip: Int!) {
// //     allTasks(orderBy: { createdAt: desc }, first: $first, skip: $skip) {
// //       id
// //       title
// //       votes
// //       url
// //       createdAt
// //     }
// //     _allTasksMeta {
// //       count
// //     }
// //   }
// // `;

// // const CREATE_TASK_MUTATION = gql`
// //   mutation createTask($title: String!, $url: String!) {
// //     createTask(title: $title, url: $url) {
// //       id
// //       title
// //       votes
// //       url
// //       createdAt
// //     }
// //   }
// // `;

// // const UPDATE_TASK_MUTATION = gql`
// //   mutation voteTask($id: String!) {
// //     voteTask(id: $id) {
// //       id
// //       votes
// //       __typename
// //     }
// //   }
// // `;

// function Header() {
//   const { pathname } = useRouter();

//   return (
//     <header>
//       <Link href='/' legacyBehavior>
//         <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
//       </Link>
//       <Link href='/about' legacyBehavior>
//         <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
//       </Link>
//       <Link href='/client-only' legacyBehavior>
//         <a className={pathname === '/client-only' ? 'is-active' : ''}>
//           Client-Only
//         </a>
//       </Link>
//       <Link href='/ssr' legacyBehavior>
//         <a className={pathname === '/ssr' ? 'is-active' : ''}>SSR</a>
//       </Link>
//       <style jsx>{`
//         header {
//           margin-bottom: 25px;
//         }
//         a {
//           font-size: 14px;
//           margin-right: 15px;
//           text-decoration: none;
//         }
//         .is-active {
//           text-decoration: underline;
//         }
//       `}</style>
//     </header>
//   );
// }

// const InfoBox = ({ children }: any) => (
//   <div className='info'>
//     <style jsx>{`
//       .info {
//         margin-top: 20px;
//         margin-bottom: 20px;
//         padding-top: 20px;
//         padding-bottom: 20px;
//         border-top: 1px solid #ececec;
//         border-bottom: 1px solid #ececec;
//       }
//     `}</style>
//     {children}
//   </div>
// );

// function Submit() {
//   const [createTask, { loading }] = useMutation(CREATE_TASK);

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new window.FormData(form);
//     const title = formData.get('title');
//     const url = formData.get('url');
//     form.reset();

//     createTask({
//       variables: { title, url },
//       update: (cache, { data: { createTask } }) => {
//         cache.modify({
//           fields: {
//             tasks(existingTasks = []) {
//               const newTaskRef = cache.writeFragment({
//                 data: createTask,
//                 fragment: gql`
//                   fragment NewTask on tasks {
//                     id
//                     type
//                   }
//                 `
//               });
//               return [newTaskRef, ...existingTasks];
//             }
//           }
//         });
//       }
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Submit</h1>
//       <input placeholder='title' name='title' type='text' required />
//       <input placeholder='url' name='url' type='url' required />
//       <button type='submit' disabled={loading}>
//         Submit
//       </button>
//       <style jsx>{`
//         form {
//           border-bottom: 1px solid #ececec;
//           padding-bottom: 20px;
//           margin-bottom: 20px;
//         }
//         h1 {
//           font-size: 20px;
//         }
//         input {
//           display: block;
//           margin-bottom: 10px;
//         }
//       `}</style>
//     </form>
//   );
// }

// function ErrorMessage({ message }: any) {
//   return (
//     <aside>
//       {message}
//       <style jsx>{`
//         aside {
//           padding: 1.5em;
//           font-size: 14px;
//           color: white;
//           background-color: red;
//         }
//       `}</style>
//     </aside>
//   );
// }

// // function TaskUpvoter({ votes, id }: any) {
// //   const [updateTask] = useMutation(UPDATE_TASK);

// //   const upvoteTask = () => {
// //     updateTask({
// //       variables: {
// //         id
// //       },
// //       optimisticResponse: {
// //         __typename: 'Mutation',
// //         voteTask: {
// //           __typename: 'Task',
// //           id,
// //           votes: votes + 1
// //         }
// //       }
// //     });
// //   };

// //   return (
// //     <button onClick={() => upvoteTask()}>
// //       {votes}
// //       <style jsx>{`
// //         button {
// //           background-color: transparent;
// //           border: 1px solid #e4e4e4;
// //           color: #000;
// //         }
// //         button:active {
// //           background-color: transparent;
// //         }
// //         button:before {
// //           align-self: center;
// //           border-color: transparent transparent #000000 transparent;
// //           border-style: solid;
// //           border-width: 0 4px 6px 4px;
// //           content: '';
// //           height: 0;
// //           margin-right: 5px;
// //           width: 0;
// //         }
// //       `}</style>
// //     </button>
// //   );
// // }

// function TaskList() {
//   // The data is already in the cache on initial load:
//   // no network request is made in the browser, but we use useQuery to retrieve
//   // the data for `READ_TASKS`—already fetched in getServerSideProps—
//   const { loading, error, data, fetchMore, networkStatus } = useQuery(
//     READ_TASKS,
//     {
//       // Setting this value to true will make the component rerender when
//       // the "networkStatus" changes, so we are able to know if it is fetching
//       // more data
//       notifyOnNetworkStatusChange: true
//     }
//   );

//   const loadingMoreTasks = networkStatus === NetworkStatus.fetchMore;
//   const { tasks, _tasksMeta } = data;

//   const loadMoreTasks = () => {
//     fetchMore({
//       variables: {
//         skip: tasks.length
//       }
//     });
//   };

//   if (error) return <ErrorMessage message='Error loading tasks.' />;
//   if (loading && !loadingMoreTasks) return <div>Loading</div>;

//   // const areMoreTasks = tasks.length < _tasksMeta.count;

//   return (
//     <section>
//       <ul>
//         {tasks.map((task: any, index: any) => (
//           <li key={task.id}>
//             <div>
//               <span>{index + 1}. </span>
//               <p>{task.content}</p>
//               {/* <TaskUpvoter id={task.id} votes={task.votes} /> */}
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* {areMoreTasks && (
//         <button onClick={() => loadMoreTasks()} disabled={loadingMoreTasks}>
//           {loadingMoreTasks ? 'Loading...' : 'Show More'}
//         </button>
//       )} */}

//       <style jsx>{`
//         section {
//           padding-bottom: 20px;
//         }
//         li {
//           display: block;
//           margin-bottom: 10px;
//         }
//         div {
//           align-items: center;
//           display: flex;
//         }
//         a {
//           font-size: 14px;
//           margin-right: 10px;
//           text-decoration: none;
//           padding-bottom: 0;
//           border: 0;
//         }
//         span {
//           font-size: 14px;
//           margin-right: 5px;
//         }
//         ul {
//           margin: 0;
//           padding: 0;
//         }
//         button:before {
//           align-self: center;
//           border-style: solid;
//           border-width: 6px 4px 0 4px;
//           border-color: #ffffff transparent transparent transparent;
//           content: '';
//           height: 0;
//           margin-right: 5px;
//           width: 0;
//         }
//       `}</style>
//     </section>
//   );
// }

// const SSRPage = () => (
//   <>
//     <Header />

//     <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>

//     <Submit />

//     <TaskList />
//   </>
// );

// export async function getServerSideProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({ query: READ_TASKS });

//   return addApolloState(apolloClient, {
//     props: {}

//     // revalidate: 1
//   });
// }

// export default SSRPage;
