import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import useKeypress from '@/hooks/useKeypress';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  children: string;
  onSetText: (text: string) => void;
}

const TaskDetailContent: FC<Props> = ({ children, onSetText }) => {
  const [inputValue, setInputValue] = useState(children);
  const [isInputActive, setIsInputActive] = useState(false);

  const taskEditRef = useRef<HTMLTextAreaElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  // const enter = useKeypress('Enter');
  const escape = useKeypress('Escape');

  const clickOutsideHandler = () => {
    if (isInputActive) {
      onSetText(inputValue);

      setIsInputActive(false);
    }
  };

  // check to see if the user clicked outside of this component
  useOnClickOutside(clickOutsideHandler, outsideRef);

  // const onEnter = useCallback(() => {
  //   if (enter) {
  //     onSetText(inputValue);

  //     setIsInputActive(false);
  //   }
  // }, [enter, inputValue, onSetText]);

  const onEscape = useCallback(() => {
    if (escape) {
      setInputValue(children);

      setIsInputActive(false);
    }
  }, [escape, children]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) taskEditRef.current?.focus();
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

  const handleClick: MouseEventHandler<HTMLSpanElement> = useCallback(
    () => setIsInputActive(true),

    [setIsInputActive]
  );

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    e => setInputValue(e.target.value),

    [setInputValue]
  );

  return (
    <div ref={outsideRef}>
      {/* if the user is editing the text, show the input field */}
      {isInputActive ? (
        <Textarea
          onChange={handleChange}
          ref={taskEditRef}
          value={inputValue}
        />
      ) : (
        <Span onClick={handleClick}>{children}</Span>
      )}
    </div>
  );
};

export default TaskDetailContent;

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
