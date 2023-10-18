import React, { useState } from 'react';
import styled from 'styled-components';
import Toggle from '../ui/Toggle';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid red;
  width: 90%;
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionMain = styled.div`
  display: flex;
`;

const QuestionFooter = styled.div``;

function Question({ questionData, updateQuestionData }) {
  const [localQuestionData, setLocalQuestionData] = useState({
    questionText: '',
    type: 'radio',
    radioOptions: [], 
    checkboxOptions: [], 
    optionText: [],
  });

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setLocalQuestionData({
      ...localQuestionData,
      type,
    });
  };

  const addOption = () => {
    const newOption = { optionText: '' };
    const options = localQuestionData.type === 'radio'
      ? [...localQuestionData.radioOptions, newOption]
      : [...localQuestionData.checkboxOptions, newOption];
    setLocalQuestionData({
      ...localQuestionData,
      [`${localQuestionData.type}Options`]: options,
    });
  };

  const [showQuest, setShowQuest] = useState(true);

  const handleDelete = () => {
    setShowQuest(false);
  };

  const handleOptionChange = (optionType, index, value) => {
    const updatedQuestionData = { ...localQuestionData };
    updatedQuestionData[optionType][index].optionText = value;
    setLocalQuestionData(updatedQuestionData);
    updateQuestionData(updatedQuestionData);
  };

  const handleInputChange = (name, value) => {
    const updatedQuestionData = { ...localQuestionData };
    updatedQuestionData[name] = value;
    setLocalQuestionData(updatedQuestionData);
    updateQuestionData(updatedQuestionData);
  };

  return (
    <>
      {showQuest && (

      <QuestionContainer>
        <QuestionContent>
          <input
            type="text"
            value={localQuestionData.questionText}
            onChange={(e) => handleInputChange('questionText', e.target.value)}
            placeholder="설문조사 질문 입력"
          />
          <select
            value={localQuestionData.type}
            onChange={handleTypeChange}
          >
            <option value="radio">라디오 버튼</option>
            <option value="checkbox">체크박스</option>
          </select>
        </QuestionContent>

        <QuestionMain>
          <div>
            {localQuestionData.type === 'radio' ? (
              <div>
                {localQuestionData.radioOptions.map((option, index) => (
                  <div key={index}>
                    <input type="radio" name={`radioOption${index}`} />
                    <input
                      type="text"
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange('radioOptions', index, e.target.value)
                      }
                      placeholder="옵션명을 입력해주세요"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {localQuestionData.checkboxOptions.map((option, index) => (
                  <div key={index}>
                    <input type="checkbox" name={`checkboxOption${index}`} />
                    <input
                      type="text"
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange('checkboxOptions', index, e.target.value)
                      }
                      placeholder="옵션명을 입력해주세요"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </QuestionMain>
        <button onClick={addOption}>추가하기</button>

        <QuestionFooter>
          <button onClick={handleDelete}>삭제</button>
          <Toggle />
        </QuestionFooter>
      </QuestionContainer>
       )}
    </>
  );
}

export default Question;
