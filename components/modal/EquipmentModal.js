import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import EquipmentForm from '../forms/EquipmentForm';

export default function EquipmentModal({ onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button type="button" onClick={handleShow}>Add Equipment</Button>
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
          <EquipmentForm onUpdate={onUpdate} handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

EquipmentModal.propTypes = {

  onUpdate: PropTypes.func.isRequired,
};
