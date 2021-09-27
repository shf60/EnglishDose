import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';

export default function Submit(props){
return(
<Navbar bg="light" expand="lg" variant="light" dark="true" 
fixed="bottom" sticky="top" className="border rounded">
<Nav>
    <Navbar.Text>{props.times.length + " Selected sessions"}</Navbar.Text>
</Nav>
    <Form className="d-flex">
      <Button variant="outline-success">Submit</Button>
    </Form>
</Navbar>
);
}