import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_IDEA } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';

const AddIdea = () => {
  const [errorMsg, setErrorMsg] = useState();

  const [addIdea] = useMutation(ADD_IDEA, {
    // update(cache, { data: { addIdea } }) {
    //   cache.modify({
    //     fields: {
    //       ideas(existingIdeas = []) {
    //         const newIdeaRef = cache.writeFragment({
    //           data: addIdea,

    //           fragment: gql`
    //             fragment NewIdea on Idea {
    //               id
    //               content
    //             }
    //           `
    //         });

    //         return existingIdeas.concat(newIdeaRef);
    //       }
    //     }
    //   });
    // },

    onError: error => {
      console.log('LogIn LOG_IN error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  let input;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await addIdea({
        variables: { content: input.value },

        // Optimistically add the Todo to the locally cached
        // list before the server responds
        optimisticResponse: {
          addIdea: { id: 'temp-id', __typename: 'Idea', content: input.value }
        }
      });
    } catch (error) {
      console.log('LogIn handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }

    input.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <p>{errorMsg}</p>}

      <input ref={node => (input = node)} />

      <button type='submit'>New idea</button>
    </form>
  );
};

export default AddIdea;
