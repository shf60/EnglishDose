import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

 export default function Courses(props) {
    return(
        <Container className="bg-white mt-5 rounded justify-content-md-center" >
            <Row>
                <Col lg={{span : 6, offset:3}} >
                <p className="text-center"> Courses! yey </p>
                </Col>
            </Row>
        </Container>
    )
    
}