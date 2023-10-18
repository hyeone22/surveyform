import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 10px;
  font-size: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
    
`;

function Button() {
    const navigate = useNavigate();    
  return <StyledButton onClick={() => navigate("/add-form")}>신규</StyledButton>
}


export default Button