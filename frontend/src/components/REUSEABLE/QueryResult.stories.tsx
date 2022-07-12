import QueryResult from './QueryResult';

const story = { component: QueryResult, title: 'REUSEABLE/QueryResult' };

export const queryResult = () => (
  <QueryResult loading={false}>
    <div>result</div>
  </QueryResult>
);

export default story;
