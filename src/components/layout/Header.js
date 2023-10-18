import React from 'react'
import styled from 'styled-components';
import Button from '../ui/Button';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;

`;

const AppTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

function Header() {
  return (
      <AppContainer>
        <AppTitle>설문조사 목록</AppTitle>
        <Button/>
      </AppContainer> 
  )
}

export default Header
