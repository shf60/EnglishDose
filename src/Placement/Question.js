
import {Card,InputGroup,Button} from 'react-bootstrap';
import QuestionModal from './QuestionModal/QuestionModal'
import { ReactTagify } from "react-tagify";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import {placementContext} from './Context.js'
import { useContext } from 'react';
import {ACTIONS} from './Context';
import { url } from '../GlobalConst'; 
import useToken from '../useToken';
const tagStyle = {
  color: '	#4f9bd9',
  fontWeight: 500,
  cursor: 'pointer'
};

const mentionStyle = {
  color: 'green',
  textDecoration: 'underline',
  cursor: 'pointer'
}
function ViewQuestion(props){
    return(
      <li className={props.correctAnswer ? "text-success font-weight-bold" : undefined }>{props.answer}</li>   
    );
  }
  export default function Question(props){
    const {todos,dispatch} = useContext(placementContext);
    const question = todos.allData.filter(q=>q.id===props.id)[0];
    const {token} = useToken();
    const config={headers: {
        'content-type':'application/json',
        'Accept':'application/json',
        'Authorization':`Bearer ${token.token}`,
        'Access-Control-Allow-Credentials':'true'
    }};
    ///////////////////////////Delete Complete Question
    const handleDelete = ()=>{
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to delete this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
            axios.delete(`http://${url}:8000/api/deleteQuestion/${props.id}`,config)
            .then((response) => {
                if (response.status===200)
                {
                  dispatch({type : ACTIONS.DELETE_COMPLETE_QUESTION , payload : props.id });
                }
              })
              .catch((error)=> {
                  if(error.response){
                    alert('There was a problem! try again. ');
                  console.log("rejected",error);
               } });
                    }
            },
            {
              label: 'No',
              // onClick: () => alert('Click No')
            }
          ]
        });
      }
    return(      
        <Card className="shadow-sm mb-2">
          <Card.Body >
          <Card.Title className="mb-2 text-muted">{props.id}- {question.question}</Card.Title>
            <Card.Text>
            {  
               question.answers.map((i,index)=>
                <ViewQuestion key={i.id} answer={`${i.id}--${i.answer}`} correctAnswer={i.correctAnswer} />
            )}
            </Card.Text>
            <InputGroup.Prepend>
            <QuestionModal id={props.id} variant='link pull-left' name='Edit'/>
            <Button variant="btn btn-link btn-sm pull-right" onClick={handleDelete}>Delete</Button>
            </InputGroup.Prepend>
           {question.tagify &&
           <ReactTagify 
            tagStyle={tagStyle}
            mentionStyle={mentionStyle}
            tagClicked={(tagify1) => dispatch({type:ACTIONS.QUESTION_SEARCH,payload:{tagify : tagify1 , tag : true}})}
            >
            <p className="pull-right">{question.tagify}</p>
            </ReactTagify>}
          </Card.Body>
        </Card>
            );
}