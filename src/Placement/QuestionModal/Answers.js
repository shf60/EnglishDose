import { Row } from 'react-bootstrap';
import { useContext } from 'react';
import {placementContext} from '../Context';
import AnswerRow from './AnswerRow';

export default function Answers(props){
    const {todos} = useContext(placementContext);

    const rows =props.id ? todos.allData.filter(q=>q.id===props.id)[0].answers.map(
        (answer,index)=>
            <AnswerRow 
                key={answer.id}
                id={props.id} 
                answer={answer}
                index={index}
                />
    ) : props.answerRows.map(
        (answer,index)=>
            <AnswerRow 
                key={answer.id}
                answer={answer}
                index={index}
                handleRemove={props.handleRemove}
                handleUpdate={props.handleUpdate}
                />
    )
    return(
        <Row>{rows}</Row>
    );
}