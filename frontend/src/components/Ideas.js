import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { IDEAS } from '../graphql/queries/idea';

const Ideas = () => {
  const [errorMsg, setErrorMsg] = useState();

  const { loading, data } = useQuery(IDEAS, {
    onError: async error => {
      console.log('IDEAS error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const ideaCards = ideas =>
    ideas.map(idea => <p key={`ideaCard${idea.id}`}>{idea.content}</p>);

  if (loading) return <p>loading</p>;

  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <>
      {data && data.ideas && data.ideas.length > 0 ? (
        ideaCards(data.ideas)
      ) : (
        <p>Add an Idea!</p>
      )}
    </>
  );
};

export default Ideas;
