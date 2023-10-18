# 설문조사 서비스 개발

□ 개발 요구사항
1. 설문조사 목록과 상세 화면, 생성 폼을 웹으로 구현하십시오. (화면 설계는 다음 페이지 참고) 
2. 구현언어는 HTML/CSS/JS 또는 React.js 중 선택해서 사용할 수 있습니다.
3. 웹 클라이언트만 구현하며, 서버사이드 비즈니스 로직은 개발하지 않습니다.
4. 설문조사 데이터는 웹브라우저의 localstorage를 사용합니다. 
5. 설문조사 데이터 구조(설문조사, 질문, 선택항목)를 설계합니다. 자료 구조는 JSON을 권장합니다. 

  React로 제작했으며 styled.component를 이용하였습니다.

## 페이지 구성

Components
  > layout
     Header.js

  > list
     Question.js

  > page
     AddForm.js
     MainPage.js

  > ui
    Button.js
    Toggle.js

  App.js
  Index.js
  App.css
  Index.css
  

### `Add Form`
  설문조사를 생성 및 편집하는 컴포넌트

 ```
   const [surveyData, setSurveyData] = useState({
    surveyTitle: "",
    surveyDuration: {
      start: "",
      end: "",
    },
    questions: [],
  });
 ``` 
    surveyTitle은 설문조사 제목
    surveyDuration {
      start : 기간
      end : 기간
    }
    question : [] : 라디오 버튼/체크박스 질문 


  'useState'를 사용하여 상태를 관리합니다. surveyData는 설문조사 데이터를 저장하고, 초기 값으로 빈 객체를 가지고 있습니다.

  'useEffect'를 사용하여 컴포넌트가 마운트 될 대 로컬 스토리지에서 저장된 설문조사 데이터를 불러옵니다.

      ```
        useEffect(() => {
        const storedSurveyData = localStorage.getItem('surveyData');
        if (storedSurveyData) {
          setSurveyData(JSON.parse(storedSurveyData));
        }
      }, []);
      ```  
  questionComponents는 질문 컴포넌트들을 저장하는 역할을 합니다.

  createNewQuestion은 새 질문을 생성하고 surveyData를 업데이트 합니다. 

  updateQuestionData 함수는 질문 데이터를 업데이트 하는데 사용됩니다. (Question 컴포넌트 데이터를 업데이트)
  그리고 변경된 데이터를 surveyData에 반영합니다.

  map 함수를 사용하여 surveyData의 질문 목록을 반복하며 각 질문에 대한 Question 컴포넌트를 렌더링합니다.

  "++++" 버튼을 클릭하면 createNewQuestion 함수를 호출하여 새 질문(라디오버튼/체크박스 질문)을 추가합니다.

  "등록하기" 버튼을 클릭하면 saveSurvey 함수가 호출되어 현재의 설문 데이터를 저장하고 초기화한 후 홈 페이지로 이동합니다.

    ```
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
    ```
    데이터를 저장하고 초기화 후에 useNavigate를 이용하여 MainPage로 이동합니다.

    [구현하지 못한 기능]
    등록하기를 클릭 후 메인 페이지에서 신규 버튼을 클릭하면 초기화 안되있음
      > 상태관리 문제로 예상하고 있습니다.
    토글 기능 ON/OFF
  
    
### `Question`

    'useState'를 사용하여 localQuestionData 상태를 초기화합니다. 현재 질문의 데이터를 관리하고 초기값으로 빈 문자열의 질문 텍스트와 'radio' 타입을 갖는 질문을 출력합니다.
    또한, radioOptions, checkboxOptions, 그리고 optionText 배열도 초기화됩니다. 

    handleTypeChange 함수는 질문 유형을 변경할 때 호출됩니다. type을 변경하면 localQuestionData가 업데이트됩니다.(라디오버튼/체크박스 버튼) 

    addOption 함수는 라디오 버튼 또는 체크박스 옵션을 추가하는 데 사용됩니다.
    현재 선택된 유형에 따라 localQuestionData의 radioOptions 또는 checkboxOptions 배열에 새 옵션을 추가합니다.

    showQuest 함수는 질문을 삭제하는데 사용됩니다. 기본적으로 true로 설정되어 있으며, handleDelete 함수를 호출하면 showQuest를 false로 변경하여 질문을 숨깁니다.

    handleOptionChange 함수는 라디오 버튼 또는 체크박스 옵션의 변경 내용을 처리합니다.
    변경된 데이터를 localQuestionData에 업데이트하고 updateQuestionData 함수를 호출하여 AddForm의 질문 데이터를 업데이트합니다.

    handleInputChange 함수는 질문 텍스트나 질문 유형 변경과 같이 다른 입력 요소의 변경 내용을 처리합니다.
    변경된 데이터를 localQuestionData에 업데이트하고 updateQuestionData 함수를 호출하여 AddForm 질문 데이터를 업데이트합니다.

    ```
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
    ```
    optionType은 변경할 옵션의 종류, index는 변경할 배열 내 인덱스, value는 변경할 옵션의 새로운 텍스트 내용입니다
    updatedQuestionData라는 새로운 객체를 생성하고, 현재 localQuestionData의 모든 속성을 복사합니다.
    그 후, updatedQuestionData에서 지정된 optionType과 index를 사용하여 해당 옵션의 optionText를 새로운 value로 설정합니다.
    setLocalQuestionData 함수를 사용하여 localQuestionData 상태를 updatedQuestionData로 업데이트합니다.
    마지막으로, updateQuestionData 함수를 호출하여 AddForm에 변경된 질문 데이터를 전달합니다.

    name은 변경할 데이터 속성의 이름을 나타내는 문자열, value는 변경할 데이터의 새로운 값입니다
    updatedQuestionData라는 새로운 객체를 생성하고, 현재 localQuestionData의 모든 속성을 복사합니다.
    그 후, updatedQuestionData에서 지정된 name을 사용하여 해당 데이터 속성을 새로운 value로 설정합니다.
    setLocalQuestionData 함수를 사용하여 localQuestionData 상태를 updatedQuestionData로 업데이트합니다. 
    마지막으로, updateQuestionData 함수를 호출하여 AddForm에 변경된 질문 데이터를 전달합니다.

    이 함수는 사용자가 입력에 따라 현재 질문을 업데이트 하고 변경된 데이터를 AddForm(상위 컴포넌트)로 전달하여 상태를 관리하고 업데이트 합니다.

    [구현하지 못한 기능]
    라디오버튼/체크박스의 기본 항목 개수
      > useEffect를 사용해서 초기 옵션을 추가?
    (오류) 설문조사 입력하면 질문이 생성됨
      > 이유 찾는 중   

### `상세 페이지`
  상세 페이지는 제작하지 못했습니다.
  저에게 주어진 시간 안에 해결하기엔 조금 버거웠습니다.
  디자인을 포함해서 설문조사 등록 페이지에서 등록하기를 클릭 후 초기화가 되지 않아 그 부분에서 많은 시간을 소비한 것 같습니다.
  또한 상세페이지를 설계하는 과정에서 어려움을 겪었습니다.
  감사합니다!
