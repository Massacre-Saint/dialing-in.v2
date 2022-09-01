import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { updateRecipe } from '../../utils/data/apiData/userRecipes';

const initialSate = {
  waterTemp: '',
};

export default function WaterTempModal({ recipeObj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);

  useEffect(() => {
    if (recipeObj.waterTemp) setFormInput(recipeObj);
  }, [recipeObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convert = parseInt(value, 10);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: convert,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    updateRecipe(recipeObj.firebaseKey, payload).then(() => router.push(`/create/recipes/${recipeObj.firebaseKey}`));
    handleClose();
  };
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleShow}>
        <Card.Body>
          <Card.Title>Choose Water Temp</Card.Title>
          <Card.Text />
        </Card.Body>
      </Card>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput1" label="Choose Water Temp Needed" className="mb-3">
                <Form.Control type="number" min={170} max={212} placeholder="Typically around 205" name="waterTemp" value={formInput.waterTemp} onChange={handleChange} required />
              </FloatingLabel>
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
WaterTempModal.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    waterTemp: PropTypes.number,
  }),
};
WaterTempModal.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    waterTemp: 205,
  }),
};
