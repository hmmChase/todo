import styled from 'styled-components';

export const form = styled.form`
  display: flex;
  width: 100%;
  grid-column: span 2;
  position: relative;

  > img {
    width: 50px;
    position: absolute;
    top: -30px;
    left: 10px;
  }

  > textarea {
    padding: 10px;
    outline: none;
    min-height: 56px;
    width: 100%;
    resize: vertical;
    border: none;
    margin-right: 1px;
  }

  > button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${props => props.theme.color.yellow_light};
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
