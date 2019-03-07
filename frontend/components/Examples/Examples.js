import QueryExample from './QueryExample';
import MutationExample from './MutationExample';

const Examples = React.memo(() => (
  <>
    <MutationExample />
    <QueryExample />
  </>
));

export default Examples;
