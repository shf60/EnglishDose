import React, { useContext, useState } from 'react';
import axios from 'axios';
import {placementContext} from '../Context';
import Answers from './Answers';
import {ACTIONS} from '../Context';
import { url } from '../../GlobalConst';
import useToken from '../../useToken';


export default function Question(props){
const {todos,dispatch} = useContext(placementContext);
const question2 =props.id ? {...todos.allData.filter(q=>q.id===props.id)[0]} : {question:"",tagify:""};
const [question,setQuestion] = useState(question2);
const [answer,setAnswer] = useState({id: null ,
                                    quizID:props.id ? props.id : null,
                                    answer:'',correctAnswer:false});
const [answerRows,setAnswerRows] =useState([]);
const {token} = useToken();
const config={headers: {
    'content-type':'application/json',
    'Accept':'application/json',
    'Authorization':`Bearer ${token.token}`,
    'Access-Control-Allow-Credentials':'true'
}};
////////////////////////////Prevent submitting 
const handleKeyPress = (e)=>{
    if(e.key==='Enter'){
        e.preventDefault();
        e.target.name==='answerInput' ? 
        handleClick() : document.getElementById('answerInput').focus();
    }
}
///////////////////////////Adding Answer to AnswerList
const handleClick=async()=>{
   if (answer.answer){
if (props.id){
    
        await axios.post(`http://${url}:8000/api/createAnswer`,{answer},config)
            .then((response) => {
                if (response.status===200)
                {
                    dispatch({type:ACTIONS.ADD_ANSWER, payload:{...answer,id:response.data}})
                }})
}
else{
    setAnswerRows(rows=>[...rows,{...answer,id:Math.random()*100}]);
}
setAnswer({...answer,answer:''})
   }
   else{alert("It seem's empty!"); }
}
/////////////////////////////Submitting
const handleSubmit=(e)=>{
    e.preventDefault();
    if(props.id){ props.handleClose();}
    else
    {
        const newQuestion={
            question:question.question,
            tagify: question.tagify,
            answers: answerRows
        }
        axios.post(`http://${url}:8000/api/create`,{newQuestion},config)
            .then((response) => {
                if (response.status===200)
                {
                    dispatch({type: ACTIONS.ADD_COMPLETEQUESTION, payload:response.data[0]})
                    props.handleClose();
                }
            })
            .catch((error)=> {
                if(error.response){
                console.log("rejected",error.response.data);
                }    });
    }

}
/////////////////////////////Updating Question
const handleUpdate=()=>{
    const question_ ={id: props.id, question : question.question, tagify: question.tagify}
    axios.put(`http://${url}:8000/api/updateQuestion/${props.id}`,{question_},config)
    .then((response) => {
        if (response.status===200)
        {     
            dispatch({type : ACTIONS.EDIT_QUESTION , payload:question_});
        }
    })
    .catch((error)=> {
        console.log(error);
        })
}
///////////////////////////////////////Remove Answer
const handleAnswerRemove =(id)=>{
    setAnswerRows(answerRows.filter(item=>item.id!==id));
}
//////////////////////////////////////Update Answer
const handleAnswerUpdate=(answer)=>{
    setAnswerRows(rows=>{
        return rows.map(row=>{
            if (row.id===answer.id){
                return {...row, answer : answer.answer , correctAnswer : answer.correctAnswer}
            }
            return row;
        })
    });
}
/////////////////////////////////
    return(
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="question">Question</label>
            <div className="input-group-prepend">
            <input 
                type="text" 
                className="form-control" 
                name="question" 
                id="question" 
                placeholder="Write your question"
                value={question.question} 
                onChange={e=>setQuestion(prev=>({...prev,question:e.target.value}))}
                onKeyPress={handleKeyPress} 
                onBlur={()=>(props.id && question.question !== question2.question && handleUpdate())}
                // ref={this.innerRef}
                required /></div>
            <label htmlFor="answerInput">Add Answer</label>
            <div className="input-group">
                <div className="input-group-prepend">
                <button 
                    type="button" 
                    className="btn btn-success fa fa-plus-square" 
                    onClick={handleClick} />
                </div>
                <input 
                    type="text" 
                    id="answerInput" 
                    name="answerInput" 
                    value={answer.answer} 
                    onKeyPress={handleKeyPress}
                    onChange={e=>{setAnswer({...answer,answer:e.target.value})}} 
                    className="form-control" 
                    placeholder="Write your answers" />
            </div>
            <label htmlFor="answers" style={{ marginTop: "5px" }}>Answers</label>
            <Answers id={props.id} 
            answerRows={answerRows}
            handleRemove={handleAnswerRemove}
            handleUpdate={handleAnswerUpdate}
            />
            <hr id="hr" />

        <input name="tagify" value={question.tagify}
         onChange={e=>setQuestion(prev=>({...prev,tagify:e.target.value}))}
          className="form-control"
          spellCheck="false"
          onBlur={()=>(props.id && question.tagify !== question2.tagify && handleUpdate())}
          onKeyPress={e=>e.key==='Enter' && e.preventDefault()}
          placeholder="Add some hints" 
              required
          />
            <input type="submit"
            value={props.id ? "Close" : "Submit"}
            className={props.id ? "btn btn-secondary pull-right" : "btn btn-success pull-right"} 
            style={{margin: '5px'}}
                />
        </div>
    </form>             
    );
}