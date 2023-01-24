/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import EditDeleteEquip from '../buttons/EditDeleteEquip';
import { updateEquipment } from '../../utils/data/apiData/recipeEquipment';

const initialSate = {
  type: '',
  name: '',
  setting: '',
};
export default function EquipmentCard({ obj, onUpdate, recipe }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);
  const { firebaseKey } = router.query;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      recipeId: firebaseKey,
    };
    updateEquipment(obj.id, payload).then(() => {
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
  useEffect(() => {
    setFormInput(obj);
  }, [obj]);
  return (
    <>
      <div className="equip-card">
        <div className="equip-card-body">
          <div>{obj.name}</div>
          <div>{obj?.type}</div>
          <div>{obj?.setting}</div>
        </div>
        <EditDeleteEquip handleShow={handleShow} obj={obj} onUpdate={onUpdate} recipe={recipe} />
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
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Descripe this step</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput1" label="Equipment Name" className="mb-3">
                <Form.Control type="text" value={formInput.name} onChange={handleChange} name="name" required />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput2" label="What kind?" className="mb-3">
                <Form.Control type="text" value={formInput.type} onChange={handleChange} name="type" required />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput3" label="Certain setting?" className="mb-3">
                <Form.Control type="text" value={formInput.setting} onChange={handleChange} name="setting" />
              </FloatingLabel>
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
EquipmentCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    recipe_id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    setting: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  recipe: PropTypes.shape(
    {
      id: PropTypes.number,
      recipe_id: PropTypes.shape(
        {
          brew_time: PropTypes.number,
          default: PropTypes.bool,
          dose: PropTypes.number,
          grind_id: PropTypes.shape(
            {
              grind_size: PropTypes.string,
              id: PropTypes.number,
              image_url: PropTypes.string,
              order: PropTypes.number,
            },
          ).isRequired,
          id: PropTypes.number,
          method_id: PropTypes.shape(
            {
              description: PropTypes.string,
              dose_max: PropTypes.number,
              dose_min: PropTypes.number,
              id: PropTypes.number,
              image_url: PropTypes.string,
              name: PropTypes.string,
              weight_max: PropTypes.number,
            },
          ).isRequired,
          published: PropTypes.bool,
          recipe_name: PropTypes.string,
          weight: PropTypes.number,
        },
      ).isRequired,
      user_id: PropTypes.shape(
        {
          id: PropTypes.number,
          image_url: PropTypes.string,
          name: PropTypes.string,
          uid: PropTypes.string,
        },
      ).isRequired,
    },
  ).isRequired,
};
