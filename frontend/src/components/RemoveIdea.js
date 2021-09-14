import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_SOFT_IDEA } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';

const RemoveIdea = props => {
  const { ideaId } = props;

  const [errorMsg, setErrorMsg] = useState();

  const [deleteSoftIdea] = useMutation(DELETE_SOFT_IDEA, {
    update(cache) {
      cache.modify({
        fields: {
          ideas(existingIdeas = []) {
            const filteredIdeas = existingIdeas.filter(
              idea => idea.__ref !== `Idea:${ideaId}`
            );

            return filteredIdeas;
          }
        }
      });
    },

    onError: error => {
      console.log('RemoveIdea DELETE_SOFT_IDEA error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await deleteSoftIdea({ variables: { id: ideaId } });
    } catch (error) {
      console.log('RemoveIdea handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'>X</button>
    </form>
  );
};

export default RemoveIdea;
