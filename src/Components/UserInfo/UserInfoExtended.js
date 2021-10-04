import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { url } from '../../GlobalConst';
import useToken from '../../useToken';

export default function UserInfoExtended(){
    const [data,setData]=useState({id:0,name:'',email:'',image:'',
    password:'',confirmPassword:'',birthDate:'',phoneNumber:'',profilePhoto:''});
    const [editEmail,setEditEmail]=useState(false);
    const {token} = useToken();
    axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
    const config={headers: {
    'Accept':'application/json',
    // 'Authorization':`Bearer ${token.token}`,
    'Access-Control-Allow-Credentials':'true'
}};
useEffect(()=>{
        
  const getUserInfo= ()=>{
         
      const config={headers: {
          'content-type':'application/json',
          'Authorization':`Bearer ${token.token}`
          }};
          axios.get(`http://${url}:8000/api/me`,config)
          .then(res=>setData(prev=>({...prev,id:res.data.id,name:res.data.name,
            email:res.data.email,userName:res.data.userName,
            birthDate:res.data.birthDate,phoneNumber:res.data.phoneNumber,profilePhoto:res.data.profilePhoto})))
          .catch(err=>console.log(err))
  }
getUserInfo();
},[token.token]);

const handleSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    data.name && formData.append("name", data.name);
    data.image && formData.append("profilePhoto", data.image);
    data.email && editEmail && formData.append("email", data.email);
    data.birthDate && formData.append("birthDate", data.birthDate);
    data.phoneNumber && formData.append("phoneNumber", data.phoneNumber);
    data.password && formData.append("password", data.password);
    data.confirmPassword && formData.append("password_confirmation", data.confirmPassword);
    axios.post(`http://${url}:8000/api/userProfile/${data.id}`,formData,config)
    .then(res=>alert('User Profile Updated'))
    .catch(err=> alert(err.response.data.message))
}
    return (
      <Container className="rounded-lg mt-5 mb-5 bg-white p-2">
        <h1 className="text-center text-dark">User Profile</h1>
    <Form onSubmit={handleSubmit}>
    <Row className="align-items-center">
    <Col lg="4">
    <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Full name" value={data.name} onChange={(e)=>setData(prev=>({...prev,name:e.target.value}))}/>
    </Form.Group>
    </Col>
    <Col lg="4" xs="auto">
    <Form.Group className="mb-3" controlId="formBasicUserName">
    <Form.Label>User Name</Form.Label>
    <InputGroup>
    <InputGroup.Prepend>
        <InputGroup.Text>@</InputGroup.Text>
    </InputGroup.Prepend>
    <Form.Control type="text" defaultValue={data.userName} disabled/>
    </InputGroup>
    </Form.Group>
    </Col>
    <Col lg="4">
    <Form.Group className="mb-3" controlId="formBirthDate">
    <Form.Label>Birthdate</Form.Label>
    <Form.Control type="date" placeholder="Birthdate" value={data.birthDate} onChange={(e)=>setData(prev=>({...prev,birthDate:e.target.value}))}/>
    </Form.Group>
    </Col>
    </Row>
    <Row className="align-items-center">
  <Col lg="4">
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={data.password} onChange={(e)=>setData(prev=>({...prev,password:e.target.value}))}/>
  </Form.Group>
  </Col><Col lg="4">
  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm password" value={data.confirmPassword} onChange={(e)=>setData(prev=>({...prev,confirmPassword:e.target.value}))}/>
  </Form.Group>
</Col><Col lg="4">
  <Form.Group className="mb-3" controlId="formBasicphoneNumber">
    <Form.Label>Phone number</Form.Label>
    <Form.Control type="text" placeholder="Phone number" value={data.phoneNumber} onChange={(e)=>setData(prev=>({...prev,phoneNumber:e.target.value}))}/>
  </Form.Group>
</Col>
</Row>
  <Row ><Col lg="4" >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>  
    <Form.Control type="email" disabled={!editEmail} placeholder="Enter email" value={data.email} onChange={(e)=>setData(prev=>({...prev,email:e.target.value}))}/>
    <Form.Check type="switch" id="custom-switch" label="edit email address" checked={editEmail} onChange={(e)=>{setEditEmail(e.target.checked); !editEmail && setData(prev=>({...prev,email:''}))}} className="text-muted"/>
  </Form.Group>
  </Col>
  <Col lg="2">
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Profile photo</Form.Label>
    <Form.Control type="file" onChange={(e)=>setData(prev=>({...prev,image:e.target.files[0]}))}/>
  </Form.Group>
   </Col>
   <Col lg="2">
    <Image src={`http://${url}:8000/${data.profilePhoto}`} alt="profile photo" weight="50" height="50" rounded />
    </Col>
    </Row>
      <Button variant="primary" type="submit">Update</Button>
   </Form>
    </Container>
    );
}