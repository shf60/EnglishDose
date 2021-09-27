/* eslint-disable jsx-a11y/no-access-key */
import React,{ useState} from 'react';
import {Button,Modal,Col} from 'react-bootstrap';
import CreateQuestion from './CreateQuestion.js';

export default function ModalQuestion(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
      setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
      <div>
      <Col lg={props.variant ? 12 : 3} md={props.variant ? 12 : 4} sm={12} xs={12}>
      <Button variant={props.variant ? props.variant : 'primary'} 
      onClick={handleShow} accessKey="c" block>{props.name ? props.name : 'Create Question'}</Button>
      </Col>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Create Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <CreateQuestion 
          handleClose={handleClose} 
          handleChange={(value)=>props.handleChange(value)} 
          question={props.question || ''} 
          answers={props.answers || ''}/>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>       
          </Modal.Footer> */}
        </Modal>
        </div>
    );
  }