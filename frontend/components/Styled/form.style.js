import styled from 'styled-components';

export const form = styled.form`
  > fieldset {
    display: flex;
    border: 0;

    > h2 {
      text-align: center;
    }

    > label {
      font-weight: 600;

      > input[type='email'],
      > input[type='password'],
      > input[type='text'] {
        border-radius: 2px;
        border: 1px solid ${props => props.theme.color.black};
        padding: 4px;
      }
    }

    > input[type='submit'] {
      background: lightgray;
      border-radius: 4px;
      border: 2px solid ${props => props.theme.color.green};
      color: ${props => props.theme.color.black};
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.3rem 1rem;
      text-shadow: 1px 1px 1px #fff;
      transition: background-color 0.2s ease-out;
      white-space: nowrap;

      &:disabled {
        border-color: gray;
        text-shadow: 1px 1px 1px #fff;
        color: gray;
      }

      &:active {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) inset;
      }

      &:hover {
        background-color: #eee;
      }
    }
  }
`;
