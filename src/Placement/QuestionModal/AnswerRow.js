import { useContext, useState } from 'react';
import { Col } from 'react-bootstrap';
import { placementContext } from '../Context';
import axios from 'axios';
import {ACTIONS} from '../Context';
import { url } from '../../GlobalConst';
import useToken from '../../useToken';

export default function AnswerRow(props){
const {dispatch} = useContext(placementContext);
const [answer,setAnswer]=useState(props.answer);
const {token} = useToken();
const config={headers: {
    'content-type':'application/json',
    'Accept':'application/json',
    'Authorization':`Bearer ${token.token}`,
    'Access-Control-Allow-Credentials':'true'
}};

const handleUpdate = (answer)=>{
    if (answer.quizID){
    axios.put(`http://${url}:8000/api/updateAnswer/${answer.id}`,answer,config).then(response=>{
        if (response.status===200)
            { 
                dispatch({type:ACTIONS.EDIT_ANSWER, payload:answer})
            }
    }).catch(err=>{
        alert(' مجاز به ارسال اطلاعات نمی باشید '+err);
    });
    }
    else
    {
        props.handleUpdate(answer);
    }
}
const handleRemove=()=>{
    if (answer.quizID){
    axios.delete(`http://${url}:8000/api/deleteAnswer/${answer.id}`,config).then((response) => {
        if (response.status===200)
        {
            dispatch({type:ACTIONS.DELETE_ANSWER, payload:answer})
        }
        }).catch((error)=> {
            if(error.response){
            console.log("rejected",error);
            }    });
        }
        else
        {
            props.handleRemove(answer.id);
        }
    }
    return(
        <Col lg={6} md={12} sm={12} xs={12} className="pl-0 pr-2">
        <div className="input-group mb-3" id="answerDiv"> 
            <div className="input-group-prepend">
        <button type="button" className="btn btn-danger fa fa-trash"
        onClick={handleRemove}
         /></div>
        <input 
            type="text"
            name="answer[]"
            className="form-control"  
            value={answer.answer}
            onChange={e=>setAnswer({...answer,answer:e.target.value})} 
            onBlur={(e)=>props.answer.answer !== answer.answer && handleUpdate(answer)}
            onKeyPress={(e)=>e.key==='Enter' && e.preventDefault()} 
            required />
        <input 
            type="checkbox" 
            name="answerOption[]" 
            value={answer.answer} 
            onChange={e=>{setAnswer({...answer,correctAnswer:e.target.checked ? 1 : 0});
             handleUpdate({...answer,correctAnswer:e.target.checked ? 1 : 0})
            }} 
            onKeyPress={(e)=>e.key==='Enter' && e.preventDefault()} 
            checked={answer.correctAnswer} />
        </div>
        </Col>
    );
}