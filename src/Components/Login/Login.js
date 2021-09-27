import { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { Form , Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { url } from '../../GlobalConst';

async function loginUser(credentials) {
  const config={headers: {
    'content-type':'application/json',
    'Accept':'application/json',
    'Access-Control-Allow-Credentials':'true',
    'Access-Control-Allow-Origin':'*'
    }};
    axios.defaults.withCredentials=true;
       return new Promise(resolve=> resolve(
        axios.get(`http://${url}:8000/sanctum/csrf-cookie`,config)
        .then(res=>axios.post(`http://${url}:8000/api/login`,credentials,config)
        .catch(err=>{
          err.response.status===500 ? alert('ارتباط با سرور برقرار نشد. بعداً مجدد تلاش کنید')
          : err.response.status===422 && alert('نام کاربری یا رمز عبور اشتباه می باشد. دوباره امتحان کنید');
        }))
       ))
     }

export default function Login({setToken}) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading] = useState(false);

  const handleSubmit =async e => {
    e.preventDefault();
    setLoading(true);
    let token = await loginUser({
      userName,
      password
    })

    token && setToken(token.data);
    setLoading(false);
  }

  return(
    <Container className="mt-5 mb-5"><Row><Col className="bg-white rounded border pb-2" lg={{span:3,offset:4}}>
<Form onSubmit={handleSubmit}>
<h2 className="text-dark">Login</h2>
  <Form.Group controlId="formBasicUserName">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" placeholder="User Name" onChange={e => setUserName(e.target.value)} required/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Login {loading && <div className="spinner-border text-light spinner-border-sm" role="status"></div>} 
  </Button>
</Form>
    </Col></Row></Container>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}