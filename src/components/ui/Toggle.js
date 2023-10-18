import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { StyleSheetManager } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 12px;
  margin-bottom: 10px;
`;

const ToggleBtn = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${props => (props.isToggled ? 'rgb(51, 30, 190)' : 'rgb(0, 30, 360)')}; 
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Circle = styled.div`
  background-color: white;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  position: absolute;
  left: 2%;
  transition: all 0.5s ease-in-out;

  ${props =>
    props.toggle &&
    css`
      transform: translate(37px, 0);
      transition: all 0.5s ease-in-out;
      border: 1px solid red;
    `}
`;

function Toggle() {
  const [isToggled, setIsToggle] = useState(false);

  const clickedToggle = () => {
    setIsToggle(prev => !prev);
  };

  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== 'toggle'}>
    <Wrapper>
      <Title>필수항목</Title>
      <ToggleBtn onClick={clickedToggle} isToggled={isToggled}>
        <Circle toggle={isToggled} />
      </ToggleBtn>
    </Wrapper>
    </StyleSheetManager>
  );
}

export default Toggle;
