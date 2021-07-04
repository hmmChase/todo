import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_NAME } from '../graphql/queries';

const Name = () => {
  const { loading, error, data } = useQuery(GET_NAME);

  if (error) return <span>error</span>;

  if (loading) return <span>loading</span>;

  return <span>{JSON.parse(JSON.stringify(data.name.name, null, 2))}</span>;
};

export default Name;
