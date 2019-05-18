import IdeaCardContainer from '../IdeaCardContainer/IdeaCardContainer';
import WithUser from '../wrappers/WithUser/WithUser';
import * as sc from './Home.style';

const Home = React.memo(() => {
  return (
    <sc.main>
      <WithUser>{me => me && <IdeaCardContainer />}</WithUser>
    </sc.main>
  );
});

export default Home;
