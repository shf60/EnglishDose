import { isArray, isObject } from 'lodash';
import React from 'react';
import axios from 'axios';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import { Col, Row } from 'react-bootstrap';

const override = css`
  display: block;
  border-color: red;
`;
const url='127.0.0.1';
class AnswerRow extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange(event){
        const target=event.target;
        target.type === 'checkbox' ? 
        this.props.handleChange({
            id:this.props.value.id,
            answer:this.props.value.answer,
            correctAnswer:target.checked ? 1 : 0},
            this.props.id):
        this.props.handleChange({
            id:this.props.value.id,
            answer:target.value,
            correctAnswer:this.props.value.correctAnswer},
            this.props.id);
    }
    handleUpdate(event){
        const target=event.target;
        const data = target.type==='checkbox' ? 
        {id:this.props.value.id,answer:this.props.value.answer,correctAnswer:target.checked ? 1 : 0} :
        {id:this.props.value.id,answer:target.value,correctAnswer:this.props.value.correctAnswer};
        this.props.handleUpdate(data);
    // axios.put(`http://${url}:8000/api/updateAnswer/${data.id}`,data,{headers: {
    //     'content-type':'application/json'}
    // }).then(response=>
    //     {
    //         console.log(response);
    //     })
    }
    handleRemove(){
        this.props.handleRemove(this.props.id);
    }
    render(){
        return(
            <Col lg={6} md={12} sm={12} xs={12} className="pl-0 pr-2">
            <div className="input-group mb-3" id="answerDiv"> 
                <div className="input-group-prepend">
            <SyncLoader
          css={override}
          size={2}
          color={"red"}
          loading={this.props.loading.id===this.props.id ? this.props.loading.val: false}
        />
            <button type="button" className="btn btn-danger fa fa-trash"
            onClick={this.handleRemove} /></div>
            <input 
                type="text"
                name="answer[]"
                className="form-control"  
                value={this.props.value.answer}
                onChange={this.handleChange} 
                onBlur={this.handleUpdate}
                onKeyPress={(e)=>e.key==='Enter' && e.preventDefault()} 
                required />
            <input 
                type="checkbox" 
                name="answerOption[]" 
                value={this.props.value.answer} 
                onChange={this.handleChange} 
                onClick={this.handleUpdate}
                onKeyPress={(e)=>e.key==='Enter' && e.preventDefault()} 
                checked={this.props.value.correctAnswer} />
            </div>
            </Col>
        );
    }
}

class Answers extends React.Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this);
        this.handleRemove=this.handleRemove.bind(this);
        this.handleUpdate=this.handleUpdate.bind(this);
    }
    handleChange(Answer,id){
        const answerList1=[...this.props.AnswerList];
        answerList1[id] = {...answerList1[id], answer : Answer.answer, correctAnswer : Answer.correctAnswer}
        this.props.handleChange(answerList1);
        
    }
   async handleUpdate(value){
       await this.props.handleUpdate(value);
    }
    handleRemove(id){
        this.props.handleRemove(id);
    }
    render(){
        
       const answerList= [...this.props.AnswerList]
       const rows= answerList.map(
            (answer,index)=>
            <AnswerRow 
                key={index+1}
                id={index} 
                value={answer} 
                handleChange={this.handleChange} 
                handleRemove={this.handleRemove}
                handleUpdate={this.handleUpdate}
                loading={this.props.loading} />
            );
        return(
            <Row>{rows}</Row>
        );
    }
    }

class Question extends React.Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.innerRef = React.createRef();
    }
    handleChange(e){
        if(e.target.name==='question'){
            this.props.handleChange(e.target.value)
        }
        else{
        const answer={id:Math.random()*100,answer:e.target.value,correctAnswer:false};
        this.props.handleChange(answer);
        }
    }
    handleKeyPress(e){
        if(e.key==='Enter'){
            e.preventDefault();
            e.target.name==='answerInput' ? 
            this.props.handleClick() : document.getElementById('answerInput').focus();
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.innerRef.current.focus();
          }, 1)
    }
render(){
    return(
        <div>
            <label htmlFor="question">Question</label>
            <div className="input-group-prepend">
            <SyncLoader
                css={override}
                size={2}
                color={"red"}
                loading={this.props.loading.qval}/>
            <input 
                type="text" 
                className="form-control" 
                name="question" 
                id="question" 
                placeholder="Write your question"
                value={this.props.Question} 
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress} 
                onBlur={this.props.handleUpdate}
                ref={this.innerRef}
                required /></div>
            <label htmlFor="answerInput">Add Answer</label>
            <div className="input-group">
                <div className="input-group-prepend">
                <button 
                    type="button" 
                    className="btn btn-success fa fa-plus-square" 
                    onClick={this.props.handleClick} />
                </div>
                <input 
                    type="text" 
                    id="answerInput" 
                    name="answerInput" 
                    value={this.props.Answer.answer} 
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange} 
                    className="form-control" 
                    placeholder="Write your answers" />
            </div>
            <label htmlFor="answers" style={{ marginTop: "5px" }}>Answers</label>
        </div>
            
    );
}
}
export default class CreateQuestion extends React.Component{
    constructor(props){
        super(props)
        this.state={
            question: this.props.question.question || '',
            answer:{id:null,answer:'',correctAnswer:false},
            answerList: this.props.answers || [],
            loading: {id:null ,val:false,qval:false,tval:false},
            tagify: this.props.question.tagify || ""
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleRemove=this.handleRemove.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUpdate=this.handleUpdate.bind(this);
    }
    handleChange(value){
        isArray(value) ?
        this.setState({answerList: value}) :
        isObject(value)? 
        this.setState({answer: value}):
        this.setState({question: value});
        // this.props ? {...value,quizID:this.props.question.id,id:null} :
    }
   handleUpdate(value){
        const config= {headers: {
            'content-type':'application/json'
        }};
        if (this.props.answers){
            const loading = {...this.state.loading};
            if (isObject(value)){
            this.props.answers.forEach((i,index)=> {
                if((i.id===value.id) && (i.answer!==value.answer || i.correctAnswer !== value.correctAnswer))
                {  
                    const update = async ()=>{
                        loading.id=index;
                        loading.val=true;
                        this.setState({loading:loading});
                        await axios.put(`http://${url}:8000/api/updateAnswer/${value.id}`,value,config)
                        .then((response) => {
                    if (response.status===200)
                    {
                        console.log(response);
                        this.props.handleChange(this.state.answerList);
                        loading.val=false;
                        this.setState({loading:loading});
                    }
                })
                .catch((error)=> {
                    if(error.response){           
                    console.log("rejected",error);
                    }})
                    }  
                    update();
                }
            }
                );
        }
        if (this.state.question !== this.props.question.question || this.state.tagify !== this.props.question.tagify)
        {
    this.state.question !== this.props.question.question ? loading.qval=true : loading.tval=true;
            this.setState({loading:loading});
            const question = {question:this.state.question,tagify:this.state.tagify};
            axios.put(`http://${url}:8000/api/updateQuestion/${this.props.question.id}`,{question},config)
            .then((response) => {
                if (response.status===200)
                {         
                    loading.qval=false;                
                    loading.tval=false;
                    this.props.handleChange(question);
                    this.setState({loading:loading});
                }
            })
            .catch((error)=> {
                if(error.response){           
                console.log("rejected",error);
                }
                })
        }
    }
}
    handleClick(){
        this.state.answer.answer ?
        this.setState(prevState=>({answerList: [...prevState.answerList,prevState.answer]})):
        alert("It seem's empty!");
        if(this.props.answers){
            const config={headers: {
            'content-type':'application/json'
            }};
            const newAnswer = {...this.state.answer};
            delete newAnswer.id;
            newAnswer.quizID = this.props.question.id;
            axios.post(`http://${url}:8000/api/createAnswer`,{newAnswer},config)
            .then((response) => {
                if (response.status===200)
                {
                    console.log(response.data);
                    this.setState({answerList : response.data});
                    this.props.handleChange(response.data);
                }
            })
            .catch((error)=> {
                if(error.response){
                console.log("rejected",error);
                }    });
        }
        this.setState({answer:{id:0,answer:'',correctAnswer:false}});
    }
    handleRemove(id){
        if(this.props){
                const loading={...this.state.loading};
                loading.id=id;
                loading.val=true;
                this.setState({loading:loading});
            const config={headers: {
                'content-type':'application/json'
            }};
            const db_id=this.state.answerList[id].id;
            axios.delete(`http://${url}:8000/api/deleteAnswer/${db_id}`,config)
            .then((response) => {
                if (response.status===200)
                {
                this.setState(prevState=>({answerList: prevState.answerList.filter((item,i)=>i!==id)}));  
                this.props.handleChange(this.state.answerList);
                loading.val=false;
                this.setState({loading:loading});
                }
            })
            .catch((error)=> {
                if(error.response){
                console.log("rejected",error);
                }    });
            }
        else{
            this.setState(prevState=>({answerList: prevState.answerList.filter((item,i)=>i!==id)}));
            }
    }
    handleSubmit(event){
        event.preventDefault();
        const config={headers: {
            'content-type':'application/json'
        }};
        const action = document.querySelector('input[type="submit"]').getAttribute("value");
        if (action==='Submit'){
            const newQuestion={
                question: this.state.question,
                tagify: this.state.tagify,
                answers: this.state.answerList
            }
            axios.post(`http://${url}:8000/api/create`,{newQuestion},config)
            .then((response) => {
                if (response.status===200)
                {
                    // console.log(response.data);
                    this.props.handleClose();
                }
            })
            .catch((error)=> {
                if(error.response){
                console.log("rejected",error.response.data);
                }    });
        }else if(action==='Close'){
            this.handleUpdate(this.answerList);
            this.props.handleClose();
        }}
    render(){
        const tagifySettings = {
                        blacklist:['aaa','ccc','/\\S/'],
                        maxTags:5,
                        placeholder:"Add hint"
                        }
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <Question Answer={this.state.answer}
                        Question={this.state.question} 
                        handleChange={this.handleChange} 
                        handleClick={this.handleClick}
                        handleUpdate={this.handleUpdate}
                        loading={this.state.loading}
                        />
                <Answers AnswerList={this.state.answerList} 
                        handleChange={this.handleChange} 
                        handleRemove={this.handleRemove}
                        handleUpdate={this.handleUpdate}
                        loading={this.state.loading}
                        />
                <hr id="hr" />
                <div className="input-group-prepend">
            <SyncLoader
                css={override}
                size={2}
                color={"red"}
                loading= {this.state.loading.tval}
                />
                <Tags settings={tagifySettings} 
                    // ref={(tagifyValues) => this.tagifyValues = tagifyValues}
                    value={this.state.tagify}
                    onChange={(e)=>this.setState({tagify: e.target.value})}
                    onBlur={this.handleUpdate}
                /></div>
                
                <input type="submit"
                value={this.props.question ? "Close" : "Submit"} 
                className={this.props.question ? "btn btn-secondary pull-right" : "btn btn-success pull-right"} 
                style={{margin: '5px'}}
                    />
                <div>
                    {/* {
                        JSON.stringify(Tags.value)
                    } */}
                </div>
                </div>
            </form>            
        );
    }
}