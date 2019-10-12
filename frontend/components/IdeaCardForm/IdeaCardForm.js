import { useState } from 'react';
// import PropTypes from 'prop-types';
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
    newIdeas.unshift({
      node: { ...data.createIdea },
      __typename: 'IdeaEdge'
    });

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

  // Suppress console output
  const handleError = err => err;

  const [createIdea] = useMutation(CREATE_IDEA_MUTATION, {
    update(cache, { data }) {
      handleUpdate(cache, data);
    },
    onError(err) {
      handleError(err);
    }
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
    // props.form.resetFields();
    setIdea('');
  };

  return (
    <sc.IdeaCardForm onSubmit={handleSubmitIdeaForm}>
      {/* <sc.FormItem> */}
      <sc.InputTextArea
        aria-label="idea"
        name="idea"
        type="text"
        placeholder="What's on your mind?"
        value={idea}
        onChange={handleChangeIdeaInput}
      />
      {/* </sc.FormItem> */}

      <sc.BoxImg src="static/ideabox.png" alt="ideabox" />

      {/* <sc.FormItem> */}
      <sc.SubmitBtn
        type="primary"
        htmlType="submit"
        disabled={isSubmitDisabled}
      >
        Add Idea
      </sc.SubmitBtn>
      {/* </sc.FormItem> */}
    </sc.IdeaCardForm>
  );
};

// IdeaCardForm.propTypes = {
//   form: PropTypes.shape({
//     resetFields: PropTypes.func.isRequired
//   }).isRequired
// };

export default IdeaCardForm;
// export default sc.IdeaCardForm.create({ name: 'IdeaCardForm' })(IdeaCardForm);
