import QueryExample from './QueryExample';
import MutationExample from './MutationExample';

class Examples extends React.PureComponent {
  render() {
    return (
      <>
        <MutationExample />
        <QueryExample />
      </>
    );
  }
}

export default Examples;
