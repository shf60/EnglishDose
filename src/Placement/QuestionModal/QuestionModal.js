import React,{useState} from 'react';
import {Button,Modal,Col} from 'react-bootstrap';
import Question from './Question';

export default function QuestionModal(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
      <Col lg={props.variant ? 12 : 3} md={props.variant ? 12 : 4} sm={12} xs={12}>
      <Button variant={props.variant ? props.variant : 'primary'} 
      onClick={handleShow} block>{props.name ? props.name : 'Create Question'}</Button>
      </Col>
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
          <Modal.Header closeButton={!props.id && 'closeButton'}>
            <Modal.Title>Create Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Question id={props.id} 
            handleClose={handleClose}
          />
          </Modal.Body>
        </Modal>
        </div>
    );
}