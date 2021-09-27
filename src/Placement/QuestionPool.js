import React,{useContext} from 'react';
import { Row,Col, Spinner } from 'react-bootstrap';
import {placementContext} from './Context.js'
import Question from './Question';
import SearchQuestion from './SearchQuestion.js';

export default function QuestionPool (){
    const {todos} = useContext(placementContext);

    return(
        <Row className="align-items-center">
        <p className="text-right col-12">Count : {todos.filteredData.length}</p>
        <SearchQuestion/>
        <Col lg={12} className="d-flex justify-content-center">
        { todos.filteredData.length<1 && <Spinner animation="border" variant="primary" className="justify-center" /> }
          </Col>
        {todos.filteredData.map((val, index) => (
             <Col key={val.id} lg={6} md={12} >
             <Question key={val.id} id={val.id} />
             </Col>
          ))}
          </Row>
    );
}
