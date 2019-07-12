import { Query } from 'react-apollo';
import IdeaCard from '../IdeaCard/IdeaCard';
import DisplayError from '../DisplayError/DisplayError';
import DisplayLoading from '../DisplayLoading/DisplayLoading';
import * as query from './IdeaCardContainer.query';
import * as sc from './IdeaCardContainer.style';

const IdeaContainer = React.memo(() => {
  const displayIdeaCards = data =>
    data.getUserIdeas.map(idea => (
      <IdeaCard key={`ideaCard${idea.id}`} {...idea} />
    ));

  const handleError = error => error;

  return (
    <Query query={query.ME_IDEAS_QUERY} onError={handleError} errorPolicy="all">
      {({ loading, error, data }) => {
        if (error) return <DisplayError error={error} />;

        if (loading) return <DisplayLoading />;

        return (
          <sc.IdeaContainer>
            {loading && <DisplayLoading />}

            {data.getUserIdeas && data.getUserIdeas.length ? (
              <sc.ul>{displayIdeaCards(data)}</sc.ul>
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
