import styled from 'styled-components';

import Spinner from '@/components/COMMON/Spinner/Spinner';

const Loading = () => (
  <Center data-testid='loading'>
    <Spinner />
  </Center>
);

export default Loading;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
