import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { READ_IDEAS } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';
import UpdateIdea from './UpdateIdea';

const Ideas = () => {
  const [errorMsg, setErrorMsg] = useState();

  const { loading, error, data } = useQuery(READ_IDEAS, {
    onError: async error => {
      console.log('Ideas READ_IDEAS error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {errorMsg}</p>;

  const ideaCards = data.ideas.map(idea => (
    <li key={idea.id}>
      <p>{idea.content}</p>

      <UpdateIdea ideaId={idea.id} />
    </li>
  ));

  return (
    <>
      <ul>
        {!loading && !error ? (
          ideaCards
        ) : (
          <li>
            <p>Add an Idea!</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default Ideas;
