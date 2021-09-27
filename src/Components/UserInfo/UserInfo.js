import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
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
       <Col lg={{offset:10,span:2}}>
 <Alert variant="secondary" className="shadow-sm m-2" style={{borderRadius:'8px 25px'}}>
    <small className="small-0 m-0 font-weight-bold"><i className="fa fa-user"></i> {data && data.name}</small>
    <br/>
    <small className="small-0 m-0"> <i className="fa fa-id-card"></i> {data && data.userName}</small>
  </Alert> 
       </Col>
    );
}