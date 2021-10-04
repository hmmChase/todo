import Ideas from './Ideas';
import { ideas as ideasMock } from '../../__mocks__/idea';

export default { component: Ideas, title: 'IDEA/Ideas' };

export const ideas = () => <Ideas ideas={ideasMock} />;
