import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_IDEA } from '../graphql/queries/idea';
import graphQLErrors from '../utils/graphQLErrors';

const RemoveIdea = props => {
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
