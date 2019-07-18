import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import * as query from './IdeaCard.query';
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
          mutation={query.DELETE_IDEA_MUTATION}
          variables={{ id: this.props.id }}
          refetchQueries={[{ query: query.ME_IDEAS_QUERY }]}
          onError={this.handleError}
          errorPolicy="all"
        >
          {deleteIdea => (
            <sc.deleteBtn
              type="button"
              onClick={e => this.handleClickDeleteBtn(e, deleteIdea)}
            />
          )}
        </Mutation>

        <Mutation
          mutation={query.UPDATE_IDEA_MUTATION}
          variables={{
            id: this.props.id,
            content: this.state.content
          }}
          onError={this.handleError}
          errorPolicy="all"
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
