/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { createEquipment } from '../../utils/data/apiData/recipeEquipment';
import AddEquipButton from '../buttons/AddEquipButton';

const initialSate = {
  type: '',
  name: '',
  setting: '',
};
export default function EquipmentModal({ recipe, recipeEquip, onUpdate }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialSate);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setFormInput(initialSate);
  }, [recipeEquip]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      recipeId: firebaseKey,
    };
    createEquipment(payload).then(() => {
      onUpdate();
    });
    handleClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      {recipe.uid === undefined || recipe.completed
        ? (
          ''
        )
        : (
          <AddEquipButton handleShow={handleShow} />
        )}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
          height: 'auto',
        }}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput2" label="What kind?" className="mb-3">
              <Form.Control type="text" value={formInput.type} onChange={handleChange} name="type" required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput1" label="Equipment Name" className="mb-3">
              <Form.Control type="text" value={formInput.name} onChange={handleChange} name="name" required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput3" label="Certain setting?" className="mb-3">
              <Form.Control type="text" value={formInput.setting} onChange={handleChange} name="setting" />
            </FloatingLabel>
            <Button type="submit" variant="success">Submit</Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

EquipmentModal.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  recipeEquip: PropTypes.arrayOf((PropTypes.shape({
    firebaseKey: PropTypes.string,
  }))),
  recipe: PropTypes.shape({
    completed: PropTypes.bool,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
EquipmentModal.defaultProps = {
  recipeEquip: PropTypes.arrayOf((PropTypes.shape({
    firebaseKey: '',
  }))),
  recipe: PropTypes.shape({
    completed: false,
    uid: '',
    firebaseKey: '',
  }),
};
