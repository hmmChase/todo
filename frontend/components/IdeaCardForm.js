import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { ideasPerPage } from '../config';
import { CURRENT_USER_PAGINATED_IDEAS, CREATE_IDEA } from '../graphql/queries';

const IdeaCardForm = () => {
  const [idea, setIdea] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleUpdate = (cache, data) => {
    // Read the data from cache for query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: ideasPerPage },
    });

    // Copy the ideas
    const newIdeas = [...ideasData.currentUserPaginatedIdeas.edges];

    // Add idea from the mutation to the beginning
    newIdeas.unshift({ node: { ...data.createIdea }, __typename: 'IdeaEdge' });

    // Write data back to the cache
    cache.writeQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: ideasPerPage },
      data: {
        ...ideasData,
        currentUserPaginatedIdeas: {
          ...ideasData.currentUserPaginatedIdeas,
          edges: newIdeas,
        },
      },
    });
  };

  const [createIdea] = useMutation(CREATE_IDEA, {
    update(cache, { data }) {
      handleUpdate(cache, data);
    },
    onError(_error) {},
  });

  const canSubmit = (value) => {
    if (value === '') setIsSubmitDisabled(true);
    else setIsSubmitDisabled(false);
  };

  const handleChangeIdeaInput = (e) => {
    // const { name, value } = event.target;
    // this.setState({ [name]: value }, this.canSubmit);

    setIdea(e.target.value);
    canSubmit(e.target.value);
  };

  const handleSubmitIdeaForm = (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    createIdea({ variables: { content: idea } });
    setIdea('');

    // canSubmit(e.target.value);
  };

  return (
    <form onSubmit={handleSubmitIdeaForm}>
      <input
        aria-label='idea input'
        name='idea'
        type='text'
        placeholder="What's on your mind?"
        value={idea}
        onChange={handleChangeIdeaInput}
      />

      {/* <img src='images/ideabox.png' alt='ideabox' /> */}

      <button
        aria-label='submit idea'
        type='submit'
        disabled={isSubmitDisabled}
      >
        Add Idea
      </button>
    </form>
  );
};

export default IdeaCardForm;
