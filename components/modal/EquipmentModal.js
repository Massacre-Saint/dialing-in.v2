/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createEquip } from '../../utils/data/apiData/recipeEquipment';
import AddEquipButton from '../buttons';
import { useAuth } from '../../utils/context/authContext';

const initialSate = {
  type: '',
  name: '',
  setting: '',
};
export default function EquipmentModal({
  recipe, recipeEquip, onUpdate, author,
}) {
  const { user } = useAuth();
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
      recipeId: recipe.id,
    };
    createEquip(payload).then(() => {
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
      {author.uid !== user.uid || recipe.published
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
            <Button type="submit" className="btn-lg">Submit</Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

EquipmentModal.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  recipeEquip: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
  }))).isRequired,
  recipe: PropTypes.shape({
    published: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

EquipmentModal.defaultProps = {
  author: PropTypes.shape({
    uid: '',
  }),
};
