import { FC, FormEvent, useState } from 'react';
import { ApolloCache, FetchResult, useMutation } from '@apollo/client';
import styled from 'styled-components';

import {
  // READ_IDEAS,
  CREATE_IDEA,
  IDEA_FIELDS
} from '../../graphql/queries/idea';

type TextArea = HTMLTextAreaElement | null;

const CreateIdea: FC = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  let input: TextArea;

  // https://www.apollographql.com/docs/react/data/mutations/#the-update-function
  const update = (cache: ApolloCache<any>, result: FetchResult<any>) =>
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

  const [createIdea] = useMutation(CREATE_IDEA, {
    // Update the cache as an approximation of server-side mutation effects
    // https://www.apollographql.com/docs/react/data/mutations/#refetching-queries
    // refetchQueries: [{ query: READ_IDEAS }],

    update: (cache, result) => update(cache, result)
  });

  const handleSubmit = async (e: FormEvent, input: TextArea) => {
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
      // console.log('CreateIdea handleSubmit error: ', error);
    }

    input.value = '';
  };

  const canSubmit = (value: string) => {
    if (value === '') setIsSubmitDisabled(true);
    else setIsSubmitDisabled(false);
  };

  const onChange = () => canSubmit(input.value);

  return (
    <Form onSubmit={e => handleSubmit(e, input)}>
      <Textarea ref={node => (input = node)} onChange={onChange} />

      <SubmitBtn type='submit' disabled={isSubmitDisabled}>
        +
      </SubmitBtn>
    </Form>
  );
};

export default CreateIdea;

const Form = styled.form`
  display: flex;
`;

export const Textarea = styled.textarea.attrs({ rows: 1 })`
  border: 0;
  border-top-left-radius: ${props => props.theme.borderRadius.primary};
  min-height: 55px;
  resize: vertical;
  padding: 0.25rem 0.5rem;
  width: 100%;

  &:focus {
    /* border-color: ${props => props.theme.border.secondary}; */
    /* box-shadow: none; */
  }

  &:hover {
    /* border-color: ${props => props.theme.border.secondary}; */
    /* box-shadow: none; */
  }
`;

export const SubmitBtn = styled.button`
  border-top-right-radius: ${props => props.theme.borderRadius.primary};
  border: none;
  width: 59.16px;
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  vertical-align: middle;
  color: ${props => props.theme.text.tertiary};
`;
