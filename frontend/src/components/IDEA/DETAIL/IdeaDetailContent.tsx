import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import useKeypress from '../../../hooks/useKeypress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

interface Props {
  currentUserOwnsIdea: boolean;
  onSetText: (text: string) => void;
  text: string;
}

const IdeaDetailContent: FC<Props> = ({
  currentUserOwnsIdea,
  onSetText,
  text
}) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const outsideRef = useRef<HTMLDivElement>(null);
  const ideaEditRef = useRef<HTMLTextAreaElement>(null);

  // const enter = useKeypress('Enter');
  const escape = useKeypress('Escape');

  const handler = () => {
    if (isInputActive) {
      onSetText(inputValue);

      setIsInputActive(false);
    }
  };

  // check to see if the user clicked outside of this component
  useOnClickOutside(handler, outsideRef);

  // const onEnter = useCallback(() => {
  //   if (enter) {
  //     onSetText(inputValue);

  //     setIsInputActive(false);
  //   }
  // }, [enter, inputValue, onSetText]);

  const onEscape = useCallback(() => {
    if (escape) {
      setInputValue(text);

      setIsInputActive(false);
    }
  }, [escape, text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) ideaEditRef.current?.focus();
  }, [isInputActive]);

  // watch the Enter and Escape key presses
  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      // onEnter();

      // if Escape is pressed, revert the text and close the editor
      onEscape();
    }
  }, [isInputActive, onEscape]); // onEnter

  const handleClick = useCallback(
    () => setIsInputActive(true),

    [setIsInputActive]
  );

  const handleChange = useCallback(
    e => setInputValue(e.target.value),

    [setInputValue]
  );

  if (currentUserOwnsIdea)
    return (
      <div ref={outsideRef}>
        {/* if the user is editing the text, show the input field */}
        {isInputActive ? (
          <Textarea
            onChange={handleChange}
            ref={ideaEditRef}
            value={inputValue}
          />
        ) : (
          <Span onClick={handleClick}>{text}</Span>
        )}
      </div>
    );

  return <p>{text}</p>;
};

export default IdeaDetailContent;

const Span = styled.span`
  cursor: pointer;
  line-height: 1.5;
  padding-left: 4px;

  &:hover {
    border-bottom: 1px solid ${props => props.theme.border.secondary};
  }
`;

const Textarea = styled.textarea.attrs({
  rows: 5
  // rows: `${props => Math.ceil(props.value.length / 50)}`
})`
  border-radius: 5px;
  border: 1px solid ${props => props.theme.border.secondary};
  line-height: 1.5;
  outline: none;
  padding: 0 0.2rem;
  resize: vertical;
  width: 100%;
`;
