import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowLeft } from "react-icons/fa";
import Question from '../list/Question';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;
 
`;

const ArrowEmoji = styled.p`
  font-size: 20px;
  margin: 0;
  cursor: pointer;
`;

const AppTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  text-align: center;
  align-items: center;
`;

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;

const DurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const AddButton = styled.button`
  font-size: 24px;
  cursor: pointer;
  background-color: #007bff; 
  color: #fff; 
  border: none; 
  border-radius: 5px; 
  padding: 10px 20px; 
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
`;

function AddForm() {
  const [surveyData, setSurveyData] = useState({
    surveyTitle: "",
    surveyDuration: {
      start: "",
      end: "",
    },
    questions: [],
  });

  const navigate = useNavigate();

  const [questionComponents, setQuestionComponents] = useState([<Question key={0} />]); // 기본 한개의 질문들

  const createNewQuestion = () => {
    const newQuestion = { questionText: "", type: "radio", optionText: "" };
    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, newQuestion],
    });
    setQuestionComponents([...questionComponents, <Question key={questionComponents.length} />]);
  };

  useEffect(() => {
    const storedSurveyData = localStorage.getItem('surveyData');
    if (storedSurveyData) {
      setSurveyData(JSON.parse(storedSurveyData));
    }
  }, []);

  const saveSurvey = () => {
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
    console.log('설문조사 데이터가 성공적으로 저장되었습니다.');
    alert("새로운 설문조사가 등록되었습니다.");
  
    // 여기서 초기화를 진행
    setSurveyData({
      surveyTitle: "",
      surveyDuration: {
        start: "",
        end: "",
      },
      questions: [],
    });
  
    // 마지막에 navigate를 호출하여 홈으로 이동
    navigate("/");
  };

  const updateQuestionData = (updatedQuestionData, questionIndex) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex] = updatedQuestionData;
    setSurveyData({
      ...surveyData,
      questions: updatedQuestions,
    });
  };

  return (
    <>
      <AppContainer>
        <ArrowEmoji onClick={() => navigate("/")}><FaArrowLeft /></ArrowEmoji>
        <AppTitle>설문조사 등록</AppTitle>
      </AppContainer>

      <AppContent>
        <div>
          <h2>설문조사 제목</h2>
          <input
            type="text"
            value={surveyData.surveyTitle}
            onChange={(e) => setSurveyData({ ...surveyData, surveyTitle: e.target.value })}
            placeholder='제목을 입력해주세요'
          />
        </div>
        <DurationContainer>
          <h2>설문조사 기간</h2>
          <input
            type="text"
            value={surveyData.surveyDuration.start}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value) && value.length <= 8) {
                setSurveyData({ ...surveyData, surveyDuration: { ...surveyData.surveyDuration, start: value } });
              }
            }}
            maxLength={8}
            placeholder='YYYYMMDD'
          />
          <input
            type="text"
            value={surveyData.surveyDuration.end}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value) && value.length <= 8) {
                setSurveyData({ ...surveyData, surveyDuration: { ...surveyData.surveyDuration, end: value } });
              }
            }}
            maxLength={8}
            placeholder='YYYYMMDD'
          />
        </DurationContainer>
        {[...surveyData.questions, { questionText: "", type: "radio", optionText: "" }].map((question, index) => (
        <Question
          key={index}
          questionData={question}
          updateQuestionData={(updatedData) => updateQuestionData(updatedData, index)}
        />
        ))}

        <AddButton onClick={createNewQuestion}>++++</AddButton>
        <StyledButton onClick={saveSurvey}>등록하기</StyledButton>
      </AppContent>
    </>
  );
}

export default AddForm;
