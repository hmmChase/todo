import styled from 'styled-components';

export const form = styled.form`
  display: flex;
  grid-column: span 2;
  position: relative;
  width: 100%;

  > img {
    left: 10px;
    position: absolute;
    top: -30px;
    width: 50px;
  }

  > textarea {
    border: none;
    margin-right: 1px;
    min-height: 56px;
    outline: none;
    padding: 10px;
    resize: vertical;
    width: 100%;
  }

  > button {
    background-color: ${props => props.theme.color.yellow_light};
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;

    &:active {
      background-color: ${props => props.theme.color.yellow_bright};
    }
  }

  @media screen and (min-width: 600px) {
    > img {
      left: 0;
    }
  }
`;
