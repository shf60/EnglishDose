import { createContext , useEffect, useReducer } from 'react';
import axios from 'axios';
import { url } from '../GlobalConst';

export const placementContext=createContext();
export const ACTIONS={
  GET_QUESTION_POOL : 'get-questionPool',
  ADD_COMPLETEQUESTION : 'add-completeQuestion',
  ADD_ANSWER : 'add-answer',
  EDIT_QUESTION: 'edit-question',
  EDIT_ANSWER: 'edit-answer',
  DELETE_COMPLETE_QUESTION: 'delete-completeQuestion',
  DELETE_ANSWER : 'delete-answer',
  QUESTION_SEARCH : 'question-search'
}
const reducer = (todos,action)=>{
  switch(action.type){
    case ACTIONS.GET_QUESTION_POOL :
      return {...todos ,allData: action.allData, filteredData: action.allData}
      case ACTIONS.DELETE_COMPLETE_QUESTION :
        return {...todos ,allData : todos.allData.filter((item,i)=>item.id !== action.payload)
          ,filteredData : todos.allData.filter((item,i)=>item.id !== action.payload)}
        case ACTIONS.EDIT_QUESTION :
          return {...todos ,allData : updateQuestion(todos.allData,action.payload)}
          case ACTIONS.EDIT_ANSWER :
            return {...todos ,allData : updateAnswer(todos.allData,action.payload)}
            case ACTIONS.DELETE_ANSWER :
              return {...todos ,allData : removeAnswer(todos.allData,action.payload)}
              case ACTIONS.ADD_ANSWER :
              return {...todos ,allData : addAnswer(todos.allData,action.payload)}
              case ACTIONS.QUESTION_SEARCH : 
              return {...todos ,filteredData : questionSearch(todos.allData,action.payload.tagify) ,
                 search : {tagify : action.payload.tagify, tag : action.payload.tag }}
                 case ACTIONS.ADD_COMPLETEQUESTION : 
                 return {...todos, allData : [action.payload,...todos.allData],
                   filteredData : [action.payload,...todos.filteredData]
                  }
      default :
        return todos;
  }
}

const questionSearch=(allData,tagify)=>{
  return allData.filter(data=> data.tagify.toLowerCase().includes(tagify.toLowerCase()));
  
}
const updateQuestion=(allData,question)=>{
  return allData.map(data=>{
    if (data.id===question.id)
    {
     return {...data, question: question.question, tagify:question.tagify} 
    }
    return data;
  }) 
}
const updateAnswer=(allData,answer)=>{
  const foundQuestionIndex = allData.findIndex(element => element.id === answer.quizID);
  const arrAnswers = allData[foundQuestionIndex].answers;
  const foundAnswerIndex = arrAnswers.findIndex(element => element.id === answer.id);
  allData[foundQuestionIndex].answers[foundAnswerIndex] = answer;
  return allData;
}
const removeAnswer=(allData,answer)=>{
  const foundQuestionIndex = allData.findIndex(element => element.id === answer.quizID);
  const arrAnswers = allData[foundQuestionIndex].answers.filter(elm=>elm.id!==answer.id);
  allData[foundQuestionIndex].answers=arrAnswers;
  return allData;
}
const addAnswer=(allData,answer)=>{
  const foundQuestionIndex = allData.findIndex(element => element.id === answer.quizID);
  allData[foundQuestionIndex].answers.push(answer);
  return allData;
}
export function PlacementProvider(props){

const [todos,dispatch] = useReducer(reducer,
  {allData: [],filteredData: [], search : {tagify : "", tag : false} ,answerRows : [] });

    useEffect(()=>{
        
        const getAll=async()=>{
          const config={headers: {
            'content-type':'application/json',
            'Authorization':`Bearer ${props.token.token}`
            }};
             await axios.get(`http://${url}:8000/api/index`,config).then(response =>{
      dispatch({type: ACTIONS.GET_QUESTION_POOL, allData: response.data.sort((a,b)=>b.id - a.id) });
               }).catch(err=>{
                console.log("while getting question pool",err);
               }
               );
             }
             getAll();
             

 },[props.token]);
 return(
<placementContext.Provider value={{todos,dispatch}}>
     {props.children}
</placementContext.Provider>
    );
}

// [{"id":1,"question":"this is the question","tagify":"","answers":[{"id":1,"quizID":1,"answer":"the new answer","correctAnswer":0},{"id":2,"quizID":1,"answer":"the new answer 2","correctAnswer":1},{"id":3,"quizID":1,"answer":"The third answer","correctAnswer":0},{"id":4,"quizID":1,"answer":"it's a Gadget that facilitate communication","correctAnswer":1}]},{"id":2,"question":"this is the second question","tagify":"","answers":[{"id":5,"quizID":2,"answer":"and it also is right answer","correctAnswer":0},{"id":6,"quizID":2,"answer":"this is the wrong answer","correctAnswer":1},{"id":7,"quizID":2,"answer":"this is the right answer","correctAnswer":0},{"id":245,"quizID":2,"answer":"The first Answer3","correctAnswer":1},{"id":5176,"quizID":2,"answer":"that's the new one","correctAnswer":0}]}]