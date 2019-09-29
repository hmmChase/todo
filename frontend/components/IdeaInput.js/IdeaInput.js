import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import debounce from 'lodash.debounce';

import { UPDATE_IDEA_MUTATION } from '../../graphql/queries';
import * as sc from './IdeaInput.style';

class IdeaInput extends React.PureComponent {
  state = { content: this.props.content };

  debounced = debounce(updateIdea => updateIdea(), 200);

  handleChangeideaInput = (e, updateIdea) => {
    this.setState({ content: e.target.value });
    this.debounced(updateIdea);
  };

  handleError = error => error;

  render() {
    return (
      <Mutation
        mutation={UPDATE_IDEA_MUTATION}
        variables={{ id: this.props.id, content: this.state.content }}
        onError={this.handleError}
      >
        {updateIdea => (
          <sc.IdeaInput
            autosize={{ minRows: 1, maxRows: 10 }}
            value={this.state.content}
            onChange={e => this.handleChangeideaInput(e, updateIdea)}
          />
        )}
      </Mutation>
    );
  }
}
IdeaInput.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default IdeaInput;
