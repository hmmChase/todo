import React from 'react';
import { useQuery } from '@apollo/client';
import { IDEAS } from '../graphql/queries';

const Ideas = () => {
  const { loading, error, data } = useQuery(IDEAS);

  const ideaCards = ideas =>
    ideas.map(idea => <p key={`ideaCard${idea.id}`}>{idea.content}</p>);

  if (loading) return <p>loading</p>;

  if (error) {
    console.log('error: ', error);

    return <p>error</p>;
  }

  return (
    <div>
      {data && data.ideas && data.ideas.length > 0 ? (
        ideaCards(data.ideas)
      ) : (
        <p>Add an Idea!</p>
      )}
    </div>
  );
};

export default Ideas;
