import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteStep, updateStep } from '../../utils/data/apiData/steps';
import { getAllSteps } from '../../utils/data/apiData/mergeData';
import EditDeleteStepsButtons from '../buttons/EditDeleteStepsButtons';

const initialSate = {
  direction: '',
};
export default function StepCard({ stepObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [objArray, setObjArray] = useState({});
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [formInput, setFormInput] = useState(initialSate);
  const handleDelete = () => {
    deleteStep(stepObj.firebaseKey).then(() => {
      onUpdate();
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    updateStep(stepObj.firebaseKey, payload).then(() => {
      onUpdate();
      handleClose();
    });
  };
  useEffect(() => {
    getAllSteps(stepObj.recipeId).then((response) => {
      setObjArray(response);
      setFormInput(stepObj);
    });
  }, [stepObj]);
  return (
    <>
      {router.pathname.includes('/process')
        ? (
          <Card className="step-card">
            <Card.Body>
              <Card.Title>Step: {stepObj?.order}</Card.Title>
              <Card.Text />
              <div>
                <span>{stepObj?.direction}</span>
              </div>
            </Card.Body>
          </Card>
        )
        : (
          <>
            <Card className="step-card">
              <Card.Body>
                <Card.Title>Step: {stepObj?.order}</Card.Title>
                <Card.Text />
                <div>
                  <span>{stepObj?.direction}</span>
                </div>
              </Card.Body>
            </Card>
            <div>
              <EditDeleteStepsButtons handleDelete={handleDelete} handleShow={handleShow} stepObj={objArray} />
            </div>
          </>
        )}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Descripe this step</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput1" label="Create Step" className="mb-3">
                <Form.Control onChange={handleChange} type="text" placeholder="Example..." value={formInput.direction} name="direction" required />
              </FloatingLabel>
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
StepCard.propTypes = {
  stepObj: PropTypes.shape({
    direction: PropTypes.string,
    firebaseKey: PropTypes.string,
    order: PropTypes.number,
    recipeId: PropTypes.string,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

StepCard.defaultProps = {
  stepObj: PropTypes.shape({
    direction: '',
    firebaseKey: '',
    order: '',
    recipeId: '',
    uid: '',
  }),
  onUpdate: () => {},
};
