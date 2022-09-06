import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
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
export default function EquipmentCard({ obj, onUpdate }) {
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
    updateEquipment(obj.firebaseKey, payload).then(() => {
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
    firebaseKey: PropTypes.string,
    recipeId: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    setting: PropTypes.string,
  }),
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
};
