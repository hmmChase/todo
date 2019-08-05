import styled from 'styled-components';

export const form = styled.form`
  > fieldset {
    display: flex;
  }

  input[type='email'],
  input[type='password'],
  input[type='text'] {
    border-radius: 2px;
    border: 1px solid ${props => props.theme.color.black};
    padding: 4px;
  }

  input[type='submit'] {
    background: none;
    border-radius: 3px;
    border: 2px solid;
    color: ${props => props.theme.color.green};
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.3rem 1rem;
    text-decoration: none;
    text-shadow: 1px 1px 0 #fff;
    transition: background-color 0.3s ease-out;
    white-space: nowrap;

    &:disabled {
      color: gray;
    }

    &:active {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) inset;
    }

    &:hover {
      background-color: #eee;
    }
  }
`;
