import { isArray } from 'lodash';
import React,{ useState} from 'react';
import {Card,InputGroup,Button} from 'react-bootstrap';
import ModalQuestion from './ModalQuestion';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

const url='127.0.0.1';
function ViewQuestion(props){
  return(
    <li className={props.correctAnswer && "text-success font-weight-bold" }>{props.answer}</li>   
  );
}
export default function QuestionPoolsChild(props){
    const [question,setQuestion] = useState(props.question);
    const [answers,setAnswers] = useState(props.question.answers);
    const handleChange =(value)=>{
      isArray(value) ? 
      setAnswers(value) : setQuestion({...question,'question':value.question,'tagify':value.tagify});
    }
    const handleDelete = ()=>{
      confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
          const config={headers: {
              'content-type':'application/json'
          }};
          axios.delete(`http://${url}:8000/api/deleteQuestion/${question.id}`,config)
          .then((response) => {
              if (response.status===200)
              {
                props.handleDelete(question.id);
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
  <Card.Title className="mb-2 text-muted">{question.id}- {question.question}</Card.Title>
    <Card.Text>
    {  
       answers.map((i,index)=>
        <ViewQuestion key={i.id} answer={`${i.id}--${i.answer}`} correctAnswer={i.correctAnswer} />
    )}
    </Card.Text>
    <InputGroup.Prepend>
    <ModalQuestion question={question} answers={answers} handleChange={handleChange} variant='link pull-left' name='Edit'/>
    <Button variant="btn btn-link btn-sm pull-right" onClick={handleDelete}>Delete</Button>
    </InputGroup.Prepend>
    {/* <Card.Link href="#">Save</Card.Link> */}
   {question.tagify && <Tags 
      value={question.tagify}
      readOnly="0"
      className="pull-right d-flex flex-row-reverse border-0"
        />}
  </Card.Body>
</Card>

    );
}