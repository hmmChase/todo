import styled from 'styled-components';

export const div = styled.div``;

export const a = styled.a`
  text-decoration: none;
  text-shadow: 1px 1px 0 #fff;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #eee;
  }

  &:active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) inset;
  }
`;

export const aSignIn = styled(a)`
  color: blueviolet;
  border-color: blueviolet;
`;

export const aSignUp = styled(a)`
  color: tomato;
  border-color: tomato;
`;

export const divPopup = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const divOuter = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const divInner = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 300px;
  padding: 20px;
  background-color: white;
`;
