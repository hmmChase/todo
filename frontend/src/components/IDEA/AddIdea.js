import { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import {
  READ_IDEAS,
  CREATE_IDEA,
  IDEA_FIELDS
} from '../../graphql/queries/idea';
import graphQLErrors from '../../utils/graphQLErrors';

const AddIdea = () => {
  const [errorMsg, setErrorMsg] = useState();

  let input;

  // https://www.apollographql.com/docs/react/data/mutations/#the-update-function
  const update = (cache, result) =>
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

  const onError = error => {
    console.log('AddIdea onError error: ', error);

    setErrorMsg(graphQLErrors(error));
  };

  const [createIdea, { data, loading, error }] = useMutation(CREATE_IDEA, {
    // Update the cache as an approximation of server-side mutation effects
    // https://www.apollographql.com/docs/react/data/mutations/#refetching-queries
    // refetchQueries: [{ query: READ_IDEAS }],

    update: (cache, result) => update(cache, result),

    onError: error => onError(error)
  });

  const handleSubmit = async (e, input) => {
    e.preventDefault();

    try {
      await createIdea({
        variables: { content: input.value }

        /**
        // Optimistically add the Todo to the locally cached
        // list before the server responds
        https://www.apollographql.com/docs/react/performance/optimistic-ui/#the-optimisticresponse-option
        optimisticResponse: {
          createIdea: {
            id: 'temp-id',
            __typename: 'Idea',
            content: input.value
          }
        }
        */
      });
    } catch (error) {
      console.log('AddIdea handleSubmit error: ', error);

      setErrorMsg(graphQLErrors(error));
    }

    input.value = '';
  };

  return (
    <Form onSubmit={e => handleSubmit(e, input)}>
      <Textarea ref={node => (input = node)} />

      <SubmitBtn type='submit'>Add Idea</SubmitBtn>
    </Form>
  );
};

export default AddIdea;

const Form = styled.form`
  display: flex;

  /* width: 100%; */
  /* position: relative; */
`;

export const Textarea = styled.textarea.attrs({ rows: 3 })`
  width: 100%;

  border: 1px solid #d9d9d9;
  border-bottom: none;

  resize: vertical;

  min-height: 54px;

  /* border-radius: 0; */
  /* margin-bottom: 0 !important; */

  /* border: none; */
  /* border-top-right-radius: 0; */
  /* border-bottom-right-radius: 0; */
  /* border-right: 1px solid ${props => props.theme.colors.black}; */

  &:focus {
    border-color: #d9d9d9;
    box-shadow: none;
  }

  &:hover {
    border-color: #d9d9d9;
    box-shadow: none;
  }
`;

export const SubmitBtn = styled.button`
  border: none;
  border-radius: 0;
  height: auto;
`;
