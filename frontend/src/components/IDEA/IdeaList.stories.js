import IdeaList from './IdeaList';
import { ideaListData } from '../../__mocks__/idea';

export default { component: IdeaList, title: 'IDEA/IdeaList' };

export const ideasList = () => <IdeaList ideas={ideaListData} />;
