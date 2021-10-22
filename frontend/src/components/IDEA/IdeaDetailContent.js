import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useKeypress from '../../utils/useKeypress';
import useOnClickOutside from '../../utils/useOnClickOutside';

const IdeaDetailContent = props => {
  const { onSetText, text } = props;

  const [isInputActive, setIsInputActive] = useState(false);

  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue);

      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      onSetText(inputValue);

      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(text);

      setIsInputActive(false);
    }
  }, [esc, text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) inputRef.current.focus();
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();

      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    event => setInputValue(event.target.value),
    [setInputValue]
  );

  const handleClick = useCallback(() => setIsInputActive(true), [
    setIsInputActive
  ]);

  return (
    <div ref={wrapperRef}>
      <Span ref={textRef} onClick={handleClick} isInputActive={isInputActive}>
        {text}
      </Span>

      <Textarea
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        value={inputValue}
        onChange={handleInputChange}
        isInputActive={isInputActive}
      />
    </div>
  );
};

IdeaDetailContent.propTypes = {
  onSetText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default IdeaDetailContent;

const Span = styled.span`
  ${props =>
    !props.isInputActive
      ? css`
          border-bottom: 1px dashed ${props.theme.border.secondary};
          cursor: pointer;
          line-height: 1.5;
          margin: 0;
          padding: 0;
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
