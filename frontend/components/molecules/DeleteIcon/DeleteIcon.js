import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { ideasPerPage } from '../../../config';
import {
  CURRENT_USER_PAGINATED_IDEAS,
  DELETE_IDEA,
} from '../../../graphql/queries';
import { XIconBtn } from '../../atoms/IconBtn/IconBtn';

const DeleteIcon = (props) => {
  const update = (cache, data) => {
    // Read the data from cache for this query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: ideasPerPage },
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
      variables: { orderBy: 'createdAt_DESC', first: ideasPerPage },
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

  return <XIconBtn onClick={onClick} />;
};

DeleteIcon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(DeleteIcon);
