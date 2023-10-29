import { CREATE_TASK, TASK_FIELDS } from '@/graphql/queries/task';
import { Tasks } from '@/models/index';
import { useContext, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UserCtx } from '@/context/User';
import Button from '@/components/COMMON/Button/Button';
import styled, { css } from 'styled-components';
import type { ChangeEventHandler, FC, FormEventHandler } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

const CreateTask: FC = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { user } = useContext(UserCtx);

  const taskInputRef = useRef<HTMLTextAreaElement>(null);

  // Update the cache to add our new task
  // https://www.apollographql.com/docs/react/api/react/hooks/#update
  // https://www.apollographql.com/docs/react/data/mutations/#the-update-function
  // https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
  const update: MutationUpdaterFn = (cache, result) =>
    cache.modify({
      fields: {
        tasks(existingTasks = []) {
          const newTaskRef = cache.writeFragment({
            data: result.data?.createTask,

            fragment: TASK_FIELDS
          });

          return [...existingTasks, newTaskRef];
        }
      }
    });

  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => setIsSubmitDisabled(true),

    update: (cache, result) => update(cache, result),

    onError: () => {}
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    createTask({
      variables: { content: taskInputRef.current?.value },

      // Optimistically add the task to the cache before the server responds
      // https://www.apollographql.com/docs/react/performance/optimistic-ui/#the-optimisticresponse-option
      optimisticResponse: {
        createTask: {
          __typename: 'Task',
          author: { __typename: 'User', id: user?.id },
          content: taskInputRef.current!.value,
          createdAt: new Date().toISOString(),
          id: 'temp-id'
        }
      }
    });

    taskInputRef.current!.value = '';
  };

  const canSubmit = (value: string) => {
    if (value === '') setIsSubmitDisabled(true);
    else setIsSubmitDisabled(false);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = () =>
    canSubmit(taskInputRef.current!.value);

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea onChange={handleChange} ref={taskInputRef} />

      <SubmitBtn disabled={isSubmitDisabled} name='submitTask' type='submit'>
        <Add $dis={isSubmitDisabled}>+</Add>
      </SubmitBtn>
    </Form>
  );
};

export default CreateTask;

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
