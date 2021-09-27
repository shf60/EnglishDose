import React from "react";
import {InputGroup,Col} from 'react-bootstrap';
import '../App.css';

export default function SearchQuestion(props){
    
    return(
        <InputGroup>
            <Col lg={6} md={12} sm={12} xs={12} className="mx-auto mb-2 mt-2">
                <InputGroup.Prepend>
                <i className="input-group-text fa fa-search" 
        style={{borderRadius: "25px 0 0 25px",background: "white",color:"grey",borderRight:0}}></i>        
                <input type="search" name="search" id="quizSearch" className="form-control" 
        style={{borderRadius: "0 25px 25px 0", borderLeft:0}} />
                </InputGroup.Prepend>
            </Col>
        </InputGroup>
    );
}