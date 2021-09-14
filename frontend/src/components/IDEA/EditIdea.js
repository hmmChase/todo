import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_IDEA } from '../../graphql/queries/idea';
import graphQLErrors from '../../utils/graphQLErrors';

const EditIdea = props => {
  const { ideaId } = props;

  const [content, setContent] = useState('');

  const [errorMsg, setErrorMsg] = useState();

  const [updateIdea, { loading, error }] = useMutation(UPDATE_IDEA, {
    onError: error => {
      console.log('EditIdea UPDATE_IDEA error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await updateIdea({ variables: { id: ideaId, content } });
    } catch (error) {
      console.log('EditIdea handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }
  };

  const handleChange = e => setContent(e.target.value);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea cols={50} rows={2} value={content} onChange={handleChange} />

        <button type='submit'>Edit</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {errorMsg}</p>}
    </>
  );
};

export default EditIdea;
