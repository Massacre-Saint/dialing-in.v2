import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import EditDeleteEquip from '../buttons/EditDeleteEquip';
import EquipmentForm from '../forms/EquipmentForm';

export default function EquipmentCard({ obj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Card className="step-card">
          <Card.Body>
            <Card.Title>{obj.name}</Card.Title>
            <Card.Text>{obj?.type}</Card.Text>
            <Card.Text>{obj?.setting}</Card.Text>
          </Card.Body>
        </Card>
        <EditDeleteEquip handleShow={handleShow} obj={obj} onUpdate={onUpdate} />
      </div>
      <div>
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
            <EquipmentForm obj={obj} onUpdate={onUpdate} handleClose={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
EquipmentCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    recipeId: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    setting: PropTypes.string,
  }),
  // recipeEquip: PropTypes.arrayOf((PropTypes.shape({
  //   firebaseKey: PropTypes.string,
  //   type: PropTypes.string,
  //   name: PropTypes.string,
  //   recipeId: PropTypes.string,
  //   setting: PropTypes.string,
  // }))),
  onUpdate: PropTypes.func.isRequired,
};
EquipmentCard.defaultProps = {
  obj: PropTypes.shape({
    firebaseKey: '',
    recipeId: '',
    name: '',
    type: '',
    setting: '',
  }),
  // recipeEquip: PropTypes.arrayOf((PropTypes.shape({
  //   firebaseKey: '',
  //   type: '',
  //   name: '',
  //   recipeId: '',
  //   setting: '',
  // }))),
};
