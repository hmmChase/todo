import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import {
  CURRENT_USER_QUERY,
  UPDATE_IDEA_MUTATION,
  DELETE_IDEA_MUTATION
} from '../../graphql/queries';
import * as sc from './IdeaCard.style';

class IdeaCard extends React.PureComponent {
  state = { content: this.props.content };

  handleChangeideaInput = (e, updateIdea) => {
    this.setState({ content: e.target.value }, updateIdea);
  };

  handleClickDeleteBtn = (e, deleteIdea) => {
    e.target.disabled = true;
    deleteIdea();
  };

  handleError = error => error;

  render() {
    return (
      <sc.li>
        <Mutation
          mutation={DELETE_IDEA_MUTATION}
          variables={{ id: this.props.id }}
          onError={this.handleError}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
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
