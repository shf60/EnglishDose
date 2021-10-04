import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { url } from '../../GlobalConst';

export default function UserInfo(){
    const [data,setData]=useState();
    const token=JSON.parse(sessionStorage.getItem('token')); 
    useEffect(()=>{
        
        const getUserInfo= ()=>{
               
            const config={headers: {
                'content-type':'application/json',
                'Authorization':`Bearer ${token.token}`
                }};
                axios.get(`http://${url}:8000/api/me`,config)
                .then(res=>setData(()=> res.data))
                .catch(err=>console.log(err))
        }
      getUserInfo();
    },[token.token]);
    return(
       <Col lg={{offset:9,span:3}}>
 <Alert variant="secondary" className="shadow-sm m-2" style={{borderRadius:'8px 25px'}}>
 <Row className="m-0 p-0">
   <Col className="m-0 p-0">
    <small className="small-0 m-0 font-weight-bold"><i className="fa fa-user"></i> {data && data.name}</small>
    <br/>
    <small className="small-0 m-0"> <i className="fa fa-id-card"></i> {data && data.userName}</small>
    <br/>
    <NavLink to="/UserProfile">User Profile</NavLink>
    </Col>
    <Col className="m-0 p-0">
     <div className="round-image" style={{backgroundImage:data ? `url(http://${url}:8000/${data.profilePhoto})` : undefined }}></div>
   </Col>
    </Row>
  </Alert> 
       </Col>
    );
}