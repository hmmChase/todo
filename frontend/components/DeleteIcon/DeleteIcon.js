import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import {
  CURRENT_USER_PAGINATED_IDEAS,
  DELETE_IDEA
} from '../../graphql/queries';
import { pageSize } from '../../constants';
import * as sc from './DeleteIcon.style';

const DeleteIcon = props => {
  const handleUpdate = (cache, data) => {
    // Read the data from cache for this query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize }
    });

    // Get id of idea to delete
    const ideaId = data.deleteIdea.id;

    // Copy the ideas
    const newIdeas = [...ideasData.currentUserPaginatedIdeas.edges];

    // Remove idea
    const filteredIdeas = newIdeas.filter(idea => idea.node.id !== ideaId);

    // Write data back to the cache
    cache.writeQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize },
      data: {
        ...ideasData,
        currentUserPaginatedIdeas: {
          ...ideasData.currentUserPaginatedIdeas,
          edges: filteredIdeas
        }
      }
    });
  };

  const [deleteIdea] = useMutation(DELETE_IDEA, {
    update(cache, { data }) {
      handleUpdate(cache, data);
    },
    onError(_error) {}
  });

  const handleClickDeleteBtn = e => {
    // ? not working
    e.target.disabled = true;

    deleteIdea({ variables: { id: props.id } });
  };

  return (
    <sc.DeleteIcon
      style={{ ...props.style }}
      aria-label='delete icon'
      type='close-square'
      theme='twoTone'
      onClick={handleClickDeleteBtn}
    />
  );
};

DeleteIcon.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(DeleteIcon);
