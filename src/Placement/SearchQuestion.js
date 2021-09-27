import React,{useContext, useState} from "react";
import {InputGroup,Col} from 'react-bootstrap';
import '../App.css';
import {placementContext,ACTIONS} from "./Context";

export default function SearchQuestion(props){
    
    const {todos,dispatch} = useContext(placementContext);
    const [search,setSearch] = useState("");

    const questionSearch=(e)=>{
        if (e.target.id==="clear") {
             dispatch({type:ACTIONS.QUESTION_SEARCH,payload:{tagify:"",tag:false}});
             setSearch("");
    }else
         setSearch(e.target.value);
    }

    const questionSerarchContext=()=>{
        dispatch({type:ACTIONS.QUESTION_SEARCH,payload:{tagify : search , tag : false}})
    }

    return(
        <InputGroup>
            <Col lg={6} md={12} sm={12} xs={12} className="mx-auto mb-2 mt-2">
                <InputGroup.Prepend>
                <i className="input-group-text fa fa-search" 
        style={{borderRadius: "25px 0 0 25px",background: "white",color:"grey",borderRight:0}}></i>        
                <input type="text" name="search" id="quizSearch" className="form-control" 
        style={{borderRadius: "0 0 0 0", borderLeft:0,borderRight:0}} 
            value={todos.search.tag ? todos.search.tagify : search}
            onChange={questionSearch}
            onKeyUp={questionSerarchContext}
            />
    <i className={(search || todos.search.tag) ? "input-group-text fa fa-close" : "input-group-text"}
    id="clear" 
    onClick={questionSearch}
    style={{borderRadius: "0 25px 25px 0",
            background: "white",
            color:"lightGrey",
            borderLeft:0,
            cursor: (search || todos.search.tag) && "pointer",
            }}></i>
                </InputGroup.Prepend>
            </Col>
        </InputGroup>
    );
}