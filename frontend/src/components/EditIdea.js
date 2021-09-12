import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_IDEA } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';

const EditIdea = props => {
  const { ideaId } = props;

  const [content, setContent] = useState('');

  const [errorMsg, setErrorMsg] = useState();

  const [updateIdea, { loading, error }] = useMutation(UPDATE_IDEA, {
    onError: async error => {
      console.log('Ideas UPDATE_IDEA error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async e => {
    e.preDefault();

    try {
      await updateIdea({ variables: { id: ideaId, content: input.value } });
    } catch (error) {
      console.log('EditIdea handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={e => setContent(e.target.value)}
          cols={50}
          rows={2}
          value={content}
        />

        <button type='submit'>Edit Idea</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {errorMsg}</p>}
    </>
  );
};

export default EditIdea;
