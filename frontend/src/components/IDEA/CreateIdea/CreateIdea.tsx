import { CREATE_IDEA, IDEA_FIELDS } from '@/graphql/queries/idea';
import { Ideas } from '@/models/index';
import { useContext, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UserCtx } from '@/context/User';
import Button from '@/components/COMMON/Button/Button';
import styled, { css } from 'styled-components';
import type { ChangeEventHandler, FC, FormEventHandler } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

const CreateIdea: FC = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { user } = useContext(UserCtx);

  const ideaInputRef = useRef<HTMLTextAreaElement>(null);

  // Update the cache to add our new idea
  // https://www.apollographql.com/docs/react/api/react/hooks/#update
  // https://www.apollographql.com/docs/react/data/mutations/#the-update-function
  // https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
  const update: MutationUpdaterFn = (cache, result) =>
    cache.modify({
      fields: {
        ideas(existingIdeas: Ideas = []) {
          const newIdeaRef = cache.writeFragment({
            data: result.data?.createIdea,

            fragment: IDEA_FIELDS
          });

          return [...existingIdeas, newIdeaRef];
        }
      }
    });

  const [createIdea] = useMutation(CREATE_IDEA, {
    onCompleted: () => setIsSubmitDisabled(true),

    update: (cache, result) => update(cache, result),

    onError: () => {}
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    createIdea({
      variables: { content: ideaInputRef.current?.value },

      // Optimistically add the idea to the cache before the server responds
      // https://www.apollographql.com/docs/react/performance/optimistic-ui/#the-optimisticresponse-option
      optimisticResponse: {
        createIdea: {
          __typename: 'Idea',
          author: { __typename: 'User', id: user?.id },
          content: ideaInputRef.current!.value,
          createdAt: new Date().toISOString(),
          id: 'temp-id'
        }
      }
    });

    ideaInputRef.current!.value = '';
  };

  const canSubmit = (value: string) => {
    if (value === '') setIsSubmitDisabled(true);
    else setIsSubmitDisabled(false);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = () =>
    canSubmit(ideaInputRef.current!.value);

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea onChange={handleChange} ref={ideaInputRef} />

      <SubmitBtn disabled={isSubmitDisabled} name='submitIdea' type='submit'>
        <Add $dis={isSubmitDisabled}>+</Add>
      </SubmitBtn>
    </Form>
  );
};

export default CreateIdea;

const Form = styled.form`
  display: flex;
`;

export const Textarea = styled.textarea.attrs({ rows: 1 })`
  border-top-left-radius: ${props => props.theme.borderRadius.primary};
  border: 0;
  min-height: 55px;
  padding: 0.25rem 0.5rem;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const SubmitBtn = styled(Button)`
  background-color: ${props => props.theme.button.hover.background};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  font-size: 3rem;
  padding: 0;
  width: 59.16px;

  &:disabled {
    background-color: ${props => props.theme.button.hover.background};
  }
`;

interface scProps {
  $dis?: boolean;
}

const Add = styled.div<scProps>`
  ${({ $dis }) => css`
    ${$dis
      ? css`
          color: ${props => props.theme.background.septenary};
          transform: rotate(45deg);
          transition-duration: 0.5s;
          transition-property: all;
          transition-timing-function: ease-in-out;
        `
      : css`
          color: greenyellow;
          transform: rotate(0deg);
          transition-duration: 0.5s;
          transition-property: all;
          transition-timing-function: ease-in-out;
        `}
  `}
`;
