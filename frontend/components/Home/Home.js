// import { IdeaCardContainer } from '..';
import IdeaCardContainer from '../IdeaCardContainer/IdeaCardContainer';
import * as sc from './Home.style';

const Home = React.memo(() => (
  <sc.main>
    <IdeaCardContainer />
  </sc.main>
));

export default Home;
