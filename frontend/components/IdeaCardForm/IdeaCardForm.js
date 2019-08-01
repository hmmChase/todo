import { Mutation } from 'react-apollo';

import {
  CURRENT_USER_QUERY,
  CREATE_IDEA_MUTATION
} from '../../graphql/queries';
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

  render() {
    return (
      <Mutation
        mutation={CREATE_IDEA_MUTATION}
        variables={{ content: this.state.idea }}
        onError={this.handleError}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
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
