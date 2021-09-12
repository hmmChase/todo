import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { READ_IDEAS, CREATE_IDEA, IDEA_FIELDS } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';

const AddIdea = () => {
  const [errorMsg, setErrorMsg] = useState();

  let input;

  const [createIdea, { data, loading, error }] = useMutation(CREATE_IDEA, {
    // Update the cache as an approximation of server-side mutation effects
    // https://www.apollographql.com/docs/react/data/mutations/#refetching-queries
    // refetchQueries: [{ query: READ_IDEAS }],

    // https://www.apollographql.com/docs/react/data/mutations/#the-update-function
    update(cache, result) {
      cache.modify({
        fields: {
          ideas(existingIdeas = []) {
            const newIdeaRef = cache.writeFragment({
              data: result.data.createIdea,

              fragment: IDEA_FIELDS
            });

            return [...existingIdeas, newIdeaRef];
          }
        }
      });
    },

    onError: error => {
      console.log('AddIdea createIdea error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async (e, input) => {
    e.preventDefault();

    try {
      await createIdea({
        variables: { content: input.value }

        // Optimistically add the Todo to the locally cached
        // list before the server responds
        // https://www.apollographql.com/docs/react/performance/optimistic-ui/#the-optimisticresponse-option
        // optimisticResponse: {
        //   createIdea: {
        //     id: 'temp-id',
        //     __typename: 'Idea',
        //     content: input.value
        //   }
        // }
      });
    } catch (error) {
      console.log('AddIdea handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }

    input.value = '';
  };

  return (
    <form onSubmit={e => handleSubmit(e, input)}>
      {errorMsg && <p>{errorMsg}</p>}

      <textarea ref={node => (input = node)} />

      <button type='submit'>New idea</button>
    </form>
  );
};

export default AddIdea;
