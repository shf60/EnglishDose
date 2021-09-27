import { Jumbotron , Button, Container } from "react-bootstrap";
import React from 'react';

export default function Home(props) {
    return(
        <Container className="mt-5">
        <Jumbotron>
  <h1>Hello, EveryOne!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary"> Learn more</Button>
  </p>
</Jumbotron>
</Container>
    );
    
}