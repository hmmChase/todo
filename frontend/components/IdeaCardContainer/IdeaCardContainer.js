import { Query } from 'react-apollo';

// import { IdeaCard, DisplayError, DisplayLoading } from '..';
import IdeaCard from '../IdeaCard/IdeaCard';
import DisplayError from '../DisplayError/DisplayError';
import DisplayLoading from '../DisplayLoading/DisplayLoading';
import { CURRENT_USER_QUERY } from '../../graphql/queries';
import * as sc from './IdeaCardContainer.style';

const IdeaContainer = React.memo(() => {
  const displayIdeaCards = ideas =>
    ideas.map(idea => <IdeaCard key={`ideaCard${idea.id}`} {...idea} />);

  const handleError = error => error;

  return (
    <Query query={CURRENT_USER_QUERY} onError={handleError}>
      {({ loading, error, data }) => {
        if (error) return <DisplayError error={error} />;
        if (loading) return <DisplayLoading />;

        return (
          <sc.IdeaContainer>
            {data && data.currentUser && data.currentUser.ideas.length ? (
              <sc.ul>{displayIdeaCards(data.currentUser.ideas)}</sc.ul>
            ) : (
              <p>Think of something!</p>
            )}
          </sc.IdeaContainer>
        );
      }}
    </Query>
  );
});

export default IdeaContainer;
