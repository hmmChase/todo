import { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { ideasPerPage } from '../../../config';
import {
  CURRENT_USER_PAGINATED_IDEAS,
  CREATE_IDEA
} from '../../../graphql/queries/idea';
import * as sc from './IdeaCardForm.style';

const IdeaCardForm = () => {
  const [idea, setIdea] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const update = (cache, data) => {
    // Read the data from cache for query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: ideasPerPage }
    });

    // Copy the ideas
    const newIdeas = [...ideasData.currentUserPaginatedIdeas.edges];

    // Add idea from the mutation to the beginning
    newIdeas.unshift({
      node: { ...data.data.createIdea },
      __typename: 'IdeaEdge'
    });

    // Write data back to the cache
    cache.writeQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: ideasPerPage },
      data: {
        ...ideasData,
        currentUserPaginatedIdeas: {
          ...ideasData.currentUserPaginatedIdeas,
          edges: newIdeas
        }
      }
    });
  };

  const [createIdea] = useMutation(CREATE_IDEA, {
    update(cache, data) {
      update(cache, data);
    },

    onError(_error) {}
  });

  const canSubmit = value => {
    if (value === '') setIsSubmitDisabled(true);
    else setIsSubmitDisabled(false);
  };

  const onChange = e => {
    setIdea(e.target.value);

    canSubmit(e.target.value);
  };

  const onFinish = () => {
    // e.preventDefault();

    setIsSubmitDisabled(true);

    createIdea({ variables: { content: idea } });

    setIdea('');

    // canSubmit(e.target.value);
  };

  return (
    <sc.IdeaCardForm onFinish={onFinish}>
      <sc.IdeaInput
        aria-label='input idea'
        name='idea'
        type='text'
        placeholder="What's on your mind?"
        value={idea}
        onChange={onChange}
      />

      <sc.BoxImg src='images/ideabox.png' alt='ideabox' />

      <sc.SubmitBtn
        aria-label='add idea'
        type='primary'
        htmlType='submit'
        disabled={isSubmitDisabled}
      >
        Add Idea
      </sc.SubmitBtn>
    </sc.IdeaCardForm>
  );
};

export default IdeaCardForm;
