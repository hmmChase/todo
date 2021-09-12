import { useQuery } from '@apollo/client';

import IdeaList from '../components/IdeaList';
import Layout from '../components/Layout';

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_MY_IDEAS, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>ERROR: {error.message}</p>;

  if (data === undefined) return <p>ERROR</p>;

  return (
    <>
      <h2>My Ideas</h2>

      {data.me && data.me.ideas.length ? (
        data.me.ideas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
      ) : (
        <p>You don't have any ideas</p>
      )}

      <ul>
        {data.currentUser &&
        data.currentUser.ideas.length &&
        !loading &&
        !error ? (
          <IdeaList ideas={data.ideas} />
        ) : (
          <li>
            <p>Add an Idea!</p>
          </li>
        )}
      </ul>
    </>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return (
    <Layout title='Home' description='Home page' header>
      {page}
    </Layout>
  );
};

export default ProfilePage;
