import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { IDEAS } from '../graphql/queries';

const Ideas = () => {
  const { loading, error, data } = useQuery(IDEAS);

  return (
    <>
      <h3>Ideas:</h3>

      <ul>
        {data &&
          data.ideas.map((idea) => <li key={idea.id}>{idea.content}</li>)}
      </ul>
    </>
  );
};

export default Ideas;
