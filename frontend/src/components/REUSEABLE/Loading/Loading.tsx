import { ReactElement } from 'react';
import styled from 'styled-components';

import Spinner from '@/components/REUSEABLE/Spinner/Spinner';

interface LoadingProps {
  loader?: boolean | ReactElement;
}

/*
 * For no loading spinner, omit loader prop
 * For default loading spinner, set loader={true}
 * For custom loading component, set loader={<Loader />}
 */

const Loading = ({ loader }: LoadingProps) => {
  // Default loading spinner
  if (loader && typeof loader === 'boolean')
    return (
      <Center>
        <Spinner />
      </Center>
    );

  // Custom loading component
  if (loader && typeof loader === 'object') return loader;

  // No loading spinner
  return null;
};

export default Loading;

export const Center = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;
