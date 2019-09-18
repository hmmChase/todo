import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';

import {
  CURRENT_USER_PAGINATED_IDEAS,
  DELETE_IDEA_MUTATION
} from '../../graphql/queries';
import { pageSize } from '../../constants';
import * as sc from './DeleteIcon.style';

const DeleteIcon = React.memo(props => {
  const handleError = error => error;

  const handleClickDeleteBtn = (e, deleteIdea) => {
    e.target.disabled = true;
    deleteIdea();
  };

  const handleUpdate = (cache, data) => {
    // Read the data from cache for this query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize }
    });

    // Get id of idea to delete
    const ideaId = data.data.deleteIdea.id;

    // Remove idea
    const newIdeas = ideasData.currentUserPaginatedIdeas.edges.filter(
      idea => idea.node.id !== ideaId
    );

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

  return (
    <Mutation
      mutation={DELETE_IDEA_MUTATION}
      variables={{ id: props.id }}
      onError={handleError}
      update={handleUpdate}
    >
      {deleteIdea => (
        <sc.DeleteIcon onClick={e => handleClickDeleteBtn(e, deleteIdea)} />
      )}
    </Mutation>
  );
});

DeleteIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default DeleteIcon;
