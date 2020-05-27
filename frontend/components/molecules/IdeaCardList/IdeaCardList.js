import PropTypes from 'prop-types';
import { List } from 'antd';
import * as sc from './IdeaCardList.style';

const IdeaCardList = (props) => (
  <List
    className={props.className}
    loading={props.loading}
    dataSource={props.ideas}
    rowKey={(idea) => `ideaCard${idea.node.id}`}
    renderItem={(idea) => <sc.IdeaCardd {...idea.node} />}
  />
);

IdeaCardList.propTypes = {
  className: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  ideas: PropTypes.arrayOf(
    PropTypes.exact({
      __typename: PropTypes.string.isRequired,
      node: PropTypes.exact({
        __typename: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.exact({
          __typename: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default React.memo(IdeaCardList);
