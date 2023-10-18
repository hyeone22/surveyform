import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';

const MainStyle = styled.p`
  font-size: 16px;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  text-align: left;
  padding: 5px 30px;
`;

const CommentLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;

  div {
    margin: 30px;
    border: 1px solid red;
    cursor: pointer; 
  }

  h3 {
    font-size: 20px; 
    margin: 5px; 
  }

  p {
    font-size: 14px; 
    margin: 0;
    
`;

function MainPage() {
  const [datas, setDatas] = useState({ surveyTitle: "", surveyDuration: { start: "", end: "" } });

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('surveyData');  // Adjust the key as needed

    if (storedData) {
      // Parse the retrieved data and update the state
      setDatas(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <Header />    
      <MainStyle>
        전체항목수 : {datas.length} 개
      </MainStyle>
      <CommentLabel>
       
          <div>
            <h3>
              <span style={{ backgroundColor: '#f0f0f0', padding: '2px 10px', margin: '0px 5px', fontSize: '13px' }}>
                {datas.surveyTitle}
              </span>
              {datas.surveyTitle}
            </h3>
            <p>기간: {datas.surveyDuration.start} - {datas.surveyDuration.end}</p>
          </div>
        
      </CommentLabel>
    </>      
  )
}

export default MainPage;


