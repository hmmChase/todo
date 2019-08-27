import { Mutation } from 'react-apollo';

import {
  CURRENT_USER_PAGINATED_IDEAS,
  CREATE_IDEA_MUTATION
} from '../../graphql/queries';
import { pageSize } from '../../config';
import * as sc from './IdeaCardForm.style';

class IdeaCardForm extends React.PureComponent {
  state = { idea: '', isSubmitDisabled: true };

  canSubmit = () => {
    if (this.state.idea === '') {
      this.setState({ isSubmitDisabled: true });
    } else {
      this.setState({ isSubmitDisabled: false });
    }
  };

  handleChangeIdeaInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.canSubmit);
  };

  handleSubmitIdeaForm = async (event, createIdea) => {
    event.preventDefault();
    this.setState({ isSubmitDisabled: true });
    createIdea();
    this.setState({ idea: '' }, this.canSubmit);
  };

  handleError = error => error;

  handleUpdate = (cache, data) => {
    // Read the data from cache for this query
    const ideasData = cache.readQuery({
      query: CURRENT_USER_PAGINATED_IDEAS,
      variables: { orderBy: 'createdAt_DESC', first: pageSize }
    });

    const newIdeas = ideasData.currentUserPaginatedIdeas.edges;

    // Add idea from the mutation to the beginning
    newIdeas.unshift({
      node: { ...data.data.createIdea },
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

  render() {
    return (
      <Mutation
        mutation={CREATE_IDEA_MUTATION}
        variables={{ content: this.state.idea }}
        onError={this.handleError}
        update={this.handleUpdate}
      >
        {createIdea => (
          <sc.form
            onSubmit={event => this.handleSubmitIdeaForm(event, createIdea)}
          >
            <img src="static/ideabox.png" alt="ideabox" />

            <textarea
              name="idea"
              type="text"
              placeholder="What's on your mind?"
              value={this.state.idea}
              onChange={event => this.handleChangeIdeaInput(event)}
            />

            <button type="submit" disabled={this.state.isSubmitDisabled}>
              Add Idea
            </button>
          </sc.form>
        )}
      </Mutation>
    );
  }
}

export default IdeaCardForm;
