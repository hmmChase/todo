import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import useKeypress from '../../../utils/useKeypress';
import useOnClickOutside from '../../../utils/useOnClickOutside';

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

  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const enter = useKeypress('Enter');
  const escape = useKeypress('Escape');

  const handler = () => {
    if (isInputActive) {
      onSetText(inputValue);

      setIsInputActive(false);
    }
  };

  // check to see if the user clicked outside of this component
  useOnClickOutside(divRef, handler);

  const onEnter = useCallback(() => {
    if (enter) {
      onSetText(inputValue);

      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEscape = useCallback(() => {
    if (escape) {
      setInputValue(text);

      setIsInputActive(false);
    }
  }, [escape, text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) textAreaRef.current?.focus();
  }, [isInputActive]);

  // watch the Enter and Escape key presses
  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();

      // if Escape is pressed, revert the text and close the editor
      onEscape();
    }
  }, [isInputActive, onEnter, onEscape]);

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
      <div ref={divRef}>
        <Span isInputActive={isInputActive} onClick={handleClick} ref={spanRef}>
          {text}
        </Span>

        <Textarea
          isInputActive={isInputActive}
          onChange={handleChange}
          ref={textAreaRef}
          value={inputValue}
        />
      </div>
    );

  return <p>{text}</p>;
};

export default IdeaDetailContent;

const Span = styled.span`
  ${props =>
    !props.isInputActive
      ? css`
          cursor: pointer;
          line-height: 1.5;
          margin: 0;
          padding: 0;

          &:hover {
            border-bottom: 1px solid ${props.theme.border.secondary};
          }
        `
      : css`
          display: none;
        `}
`;

const Textarea = styled.textarea.attrs({
  rows: 5
  // rows: `${props => Math.ceil(props.value.length / 50)}`
})`
  ${props =>
    props.isInputActive
      ? css`
          border: none;
          border-bottom: 1px solid ${props.theme.border.secondary};
          line-height: 1.5;
          margin: 0;
          outline: none;
          padding: 0;
          resize: vertical;
          width: 100%;
        `
      : css`
          display: none;
        `}
`;
