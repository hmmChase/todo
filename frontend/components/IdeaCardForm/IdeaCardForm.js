import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  CURRENT_USER_PAGINATED_IDEAS,
  CREATE_IDEA_MUTATION
} from '../../graphql/queries';
import { pageSize } from '../../constants';
import * as sc from './IdeaCardForm.style';

const IdeaCardForm = () => {
  const [idea, setIdea] = useState('');

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleUpdate = (cache, data) => {
    // Read the data from cache for query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize }
    });

    // Copy the ideas
    const newIdeas = [...ideasData.currentUserPaginatedIdeas.edges];

    // Add idea from the mutation to the beginning
    newIdeas.unshift({ node: { ...data.createIdea }, __typename: 'IdeaEdge' });

    // Write data back to the cache
    cache.writeQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize },
      data: {
        ...ideasData,
        currentUserPaginatedIdeas: {
          ...ideasData.currentUserPaginatedIdeas,
          edges: newIdeas
        }
      }
    });
  };

  const [createIdea] = useMutation(CREATE_IDEA_MUTATION, {
    update(cache, { data }) {
      handleUpdate(cache, data);
    },
    onError(_err) {}
  });

  const canSubmit = value => {
    if (value === '') {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  };

  const handleChangeIdeaInput = e => {
    setIdea(e.target.value);
    canSubmit(e.target.value);
  };

  const handleSubmitIdeaForm = e => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    createIdea({ variables: { content: idea } });
    setIdea('');
  };

  return (
    <sc.IdeaCardForm onSubmit={handleSubmitIdeaForm}>
      <sc.InputTextArea
        aria-label='idea'
        name='idea'
        type='text'
        placeholder="What's on your mind?"
        value={idea}
        onChange={handleChangeIdeaInput}
      />

      <sc.BoxImg src='static/images/ideabox.png' alt='ideabox' />

      <sc.SubmitBtn
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
