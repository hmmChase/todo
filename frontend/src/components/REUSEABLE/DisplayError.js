import PropTypes from 'prop-types';
import styled from 'styled-components';

const DisplayError = props => {
  const { error } = props;

  if (error && error.graphQLErrors && error.graphQLErrors.length) {
    return (
      <ErrorList>
        {error.graphQLErrors.map((error, i) => (
          <ErrorItem key={`error${i}`}>
            <Wrapper data-testid='errorMessage'>
              <span>{error.message}</span>
            </Wrapper>
          </ErrorItem>
        ))}
      </ErrorList>
    );
  }

  if (error && error.message) {
    return (
      <Wrapper data-testid='errorMessage'>
        <span>{error.message}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper data-testid='errorMessage'>
      <span>'Opps, something went wrong.'</span>
    </Wrapper>
  );
};

DisplayError.propTypes = {
  error: PropTypes.exact({
    extraInfo: PropTypes.any,
    graphQLErrors: PropTypes.array,
    networkError: PropTypes.object,
    message: PropTypes.string
  })
};

export default DisplayError;

const ErrorList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ErrorItem = styled.li`
  :not(:first-child) {
    margin-top: 10px;
  }
`;

const Wrapper = styled.div`
  padding: 4px;
  border: 1px solid #000;
  background-color: ${props => props.theme.statusDisplays.error.background};
  color: ${props => props.theme.statusDisplays.error.text};
  border-radius: ${props => props.theme.buttons.borderRadius};
`;
