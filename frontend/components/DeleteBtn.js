import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
// import { useMutation } from '@apollo/client';
import { CURRENT_USER_PAGINATED_IDEAS, DELETE_IDEA } from '../graphql/queries';
import { pageSize } from '../config';

const DeleteBtn = (props) => {
  const update = (cache, data) => {
    // Read the data from cache for this query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize },
    });

    // Get id of idea to delete
    const ideaId = data.data.deleteIdea.id;

    // Copy the ideas
    const newIdeas = [...ideasData.currentUserPaginatedIdeas.edges];

    // Remove idea
    const filteredIdeas = newIdeas.filter((idea) => idea.node.id !== ideaId);

    // Write data back to the cache
    cache.writeQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize },
      data: {
        ...ideasData,
        currentUserPaginatedIdeas: {
          ...ideasData.currentUserPaginatedIdeas,
          edges: filteredIdeas,
        },
      },
    });
  };

  const [deleteIdea] = useMutation(DELETE_IDEA, {
    update(cache, data) {
      update(cache, data);
    },

    onError(_error) {},
  });

  const onClick = (e) => {
    // ? not working
    e.target.disabled = true;

    deleteIdea({ variables: { id: props.id } });
  };

  return (
    <button aria-label='delete button' onClick={onClick}>
      X
    </button>
  );
};

DeleteBtn.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(DeleteBtn);
