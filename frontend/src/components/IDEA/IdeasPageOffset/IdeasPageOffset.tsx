import { ideasPerPage } from '@/constants/config';
import { READ_IDEAS_PAGINATED_OFFSET } from '@/graphql/queries/idea';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Button from '@/components/COMMON/Button/Button';
import Ideas from '@/components/IDEA/Ideas/Ideas';
import Loading from '@/components/COMMON/Loading/Loading';
import QueryResult from '@/components/COMMON/QueryResult/QueryResult';
import styled from 'styled-components';
import type { FC } from 'react';
import type { Ideas as Ideass } from '@/models/index';

const IdeasPageOffset: FC = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // const [offset, setOffset] = useState(0);

  // const [page, setPage] = useState((offset + ideasPerPage) / ideasPerPage);

  const [page, setPage] = useState(0);

  const { data, error, loading, fetchMore } = useQuery(
    READ_IDEAS_PAGINATED_OFFSET,
    {
      // variables: { offset, limit: ideasPerPage },

      variables: { limit: ideasPerPage, offset: page * ideasPerPage },

      // Allows component to rerender with loading:true whenever fetchMore is called
      notifyOnNetworkStatusChange: true
    }
  );

  const handleChangePageBackwards = () => setPage(prev => prev - 1);

  const handleChangePageForwards = () => setPage(prev => prev + 1);

  // const handleChangePageBackwards = () => {
  //   const previousOffset = offset - ideasPerPage;

  //   setOffset(previousOffset);

  //   const previousPage = offset / ideasPerPage;

  //   setPage(previousPage);
  // };

  // const handleChangePageForwards = () => {
  //   const nextOffset = offset + ideasPerPage;

  //   setOffset(nextOffset);

  //   const nextPage = (nextOffset + ideasPerPage) / ideasPerPage;

  //   setPage(nextPage);
  // };

  // const handleLoadMore = () => {
  //   setIsLoadingMore(true);

  //   fetchMore({
  //     variables: { offset: offset + ideasPerPage, limit: ideasPerPage }
  //   });

  //   setIsLoadingMore(false);
  // };

  const ideas: Ideass = data?.ideasPaginatedOffset;

  // const haveIdeas = !!ideas;

  return (
    <QueryResult
      error={error}
      loading={loading}
      showError={true}
      showLoading={true}
    >
      {ideas ? <Ideas ideas={ideas} /> : <p>There are no ideas</p>}

      {ideas &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <Nav>
            <Button
              disabled={!page}
              name='back'
              onClick={handleChangePageBackwards}
            >
              {'< Back'}
            </Button>

            <span>{page + 1}</span>

            <Button name='forward' onClick={handleChangePageForwards}>
              {'Next >'}
            </Button>
          </Nav>
        ))}
    </QueryResult>
  );
};

export default IdeasPageOffset;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1 rem;
`;
