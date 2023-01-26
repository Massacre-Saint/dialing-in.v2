import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteStep, updateStep } from '../../utils/data/apiData/steps';
import EditDeleteStepsButtons from '../buttons/EditDeleteStepsButtons';

const initialSate = {
  direction: '',
};
export default function StepCard({
  stepObj, onUpdate, recipeObj, author,
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [formInput, setFormInput] = useState(initialSate);
  const handleDelete = () => {
    deleteStep(stepObj.id).then(() => {
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
    updateStep(stepObj.id, payload).then(() => {
      onUpdate();
      handleClose();
    });
  };
  useEffect(() => {
    setFormInput(stepObj);
  }, [stepObj]);
  return (
    <>
      {router.pathname.includes('/process') || router.pathname.includes('/brew')
        ? (
          <div className="step-card">
            <div className="step-card-body">
              <div className="step-num">{stepObj?.order}.</div>
              <div>
                <span>{stepObj?.description}</span>
              </div>
            </div>
          </div>
        )
        : (
          <>
            <div className="step-card">
              <div className="step-card-body">
                <div className="step-num">{stepObj?.order}.</div>
                <div>
                  <span>{stepObj?.description}</span>
                </div>
              </div>
              <EditDeleteStepsButtons handleDelete={handleDelete} handleShow={handleShow} author={author} recipeObj={recipeObj} />
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
    description: PropTypes.string,
    id: PropTypes.number,
    order: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  recipeObj: PropTypes.shape({
    completed: PropTypes.bool,
  }).isRequired,
  author: PropTypes.shape({
    id: PropTypes.number,
  }),
};
StepCard.defaultProps = {
  author: PropTypes.shape({
    id: 123,
  }),
};
