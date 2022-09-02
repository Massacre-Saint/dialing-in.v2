/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getRecipe, updateRecipe } from '../../utils/data/apiData/userRecipes';

const initialSate = {
  waterTemp: '',
  weight: '',
};

export default function WaterTempModal({ recipeObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [, setUserRecipe] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);

  useEffect(() => {
    if (recipeObj.waterTemp && recipeObj.weight) setFormInput(recipeObj);
    getRecipe(recipeObj.firebaseKey).then(setUserRecipe);
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
    updateRecipe(recipeObj.firebaseKey, payload).then(() => {
      onUpdate();
      router.push(`/create/recipes/${recipeObj.firebaseKey}`);
      handleClose();
    });
  };
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleShow}>
        <Card.Body>
          <Card.Title>Water:</Card.Title>
          <Card.Text>{recipeObj?.weight} grams {recipeObj.weight ? 'of' : ''}  {recipeObj.waterTemp} °F</Card.Text>
        </Card.Body>
      </Card>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
          height: 'fit-content',
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
              <FloatingLabel controlId="floatingInput2" label="How much" className="mb-3">
                <Form.Control type="number" name="weight" value={formInput.weight} onChange={handleChange} required />
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
    weight: PropTypes.number,
  }),
  onUpdate: PropTypes.func,

};
WaterTempModal.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    waterTemp: 205,
    weight: 300,
  }),
  onUpdate: () => {},

};
