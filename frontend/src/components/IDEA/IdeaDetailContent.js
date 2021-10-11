import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

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

  const handleSpanClick = useCallback(() => setIsInputActive(true), [
    setIsInputActive
  ]);

  return (
    <Wrapper>
      <span className='inline-text' ref={wrapperRef}>
        <span
          ref={textRef}
          onClick={handleSpanClick}
          className={`inline-text_copy inline-text_copy--${
            !isInputActive ? 'active' : 'hidden'
          }`}
        >
          {text}
        </span>

        <input
          ref={inputRef}
          // set the width to the input length multiplied by the x height
          // it's not quite right but gets it close
          style={{ minWidth: Math.ceil(inputValue.length) + 'ch' }}
          value={inputValue}
          onChange={handleInputChange}
          className={`inline-text_input inline-text_input--${
            isInputActive ? 'active' : 'hidden'
          }`}
        />
      </span>
    </Wrapper>
  );
};

export default IdeaDetailContent;

const Wrapper = styled.div`
  /* these make sure it can work in any text element */
  .inline-text_copy--active,
  .inline-text_input--active {
    font: inherit;
    color: inherit;
    text-align: inherit;
    padding: 0;
    background: none;
    border: none;
    border-bottom: 1px dashed #999999;
    outline: none;
  }

  .inline-text_copy--active {
    cursor: pointer;
  }

  .inline-text_copy--hidden,
  .inline-text_input--hidden {
    display: none;
  }

  .inline-text_input--active {
    border-bottom: 1px solid #666666;
    text-align: left;
  }
`;
