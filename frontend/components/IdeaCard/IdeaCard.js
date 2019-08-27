import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import debounce from 'lodash.debounce';

import {
  CURRENT_USER_PAGINATED_IDEAS,
  UPDATE_IDEA_MUTATION,
  DELETE_IDEA_MUTATION
} from '../../graphql/queries';
import { pageSize } from '../../config';
import * as sc from './IdeaCard.style';

class IdeaCard extends React.PureComponent {
  state = { content: this.props.content };

  debounced = debounce(updateIdea => updateIdea(), 200);

  handleChangeideaInput = (e, updateIdea) => {
    this.setState({ content: e.target.value });
    this.debounced(updateIdea);
  };

  handleClickDeleteBtn = (e, deleteIdea) => {
    e.target.disabled = true;
    deleteIdea();
  };

  handleError = error => error;

  handleUpdate = (cache, data) => {
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

  render() {
    return (
      <sc.li>
        <Mutation
          mutation={DELETE_IDEA_MUTATION}
          variables={{ id: this.props.id }}
          onError={this.handleError}
          update={this.handleUpdate}
        >
          {deleteIdea => (
            <sc.deleteBtn
              type="button"
              onClick={e => this.handleClickDeleteBtn(e, deleteIdea)}
            />
          )}
        </Mutation>

        <Mutation
          mutation={UPDATE_IDEA_MUTATION}
          variables={{ id: this.props.id, content: this.state.content }}
          onError={this.handleError}
        >
          {updateIdea => (
            <sc.ideaInput
              type="text"
              value={this.state.content}
              onChange={e => this.handleChangeideaInput(e, updateIdea)}
            />
          )}
        </Mutation>
      </sc.li>
    );
  }
}

IdeaCard.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default IdeaCard;
