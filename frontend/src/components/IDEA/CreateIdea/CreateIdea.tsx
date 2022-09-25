import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useContext,
  useRef,
  useState
} from 'react';
import { MutationUpdaterFn, useMutation } from '@apollo/client';
import styled from 'styled-components';

import { CREATE_IDEA, IDEA_FIELDS } from '@/graphql/queries/idea';
import { Ideas } from '@/models/index';
import { UserCtx } from '@/context/User';

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
          id: 'temp-id',
          content: ideaInputRef.current!.value,
          author: { id: user?.id, __typename: 'User' }
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

      <SubmitBtn disabled={isSubmitDisabled} type='submit'>
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
  border-top-left-radius: ${props => props.theme.borderRadius.primary};
  border: 0;
  min-height: 55px;
  padding: 0.25rem 0.5rem;
  resize: vertical;
  width: 100%;

  &:focus {
    /* border-color: ${props => props.theme.border.secondary};
		*/ /* box-shadow: none;
		*/
  }

  &:hover {
    /* border-color: ${props => props.theme.border.secondary};
		*/ /* box-shadow: none;
		*/
  }
`;

export const SubmitBtn = styled.button`
  border-top-right-radius: ${props => props.theme.borderRadius.primary};
  border: none;
  color: ${props => props.theme.text.tertiary};
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  width: 59.16px;
`;
