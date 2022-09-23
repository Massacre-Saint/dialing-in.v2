/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, InputGroup } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
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
              <InputGroup label="Water Temperature Needed" className="mb-3">
                <Form.Control type="number" min={34} max={212} placeholder="Typically around 205-212 °F" name="waterTemp" value={formInput.waterTemp} onChange={handleChange} required />
                <InputGroup.Text>°F</InputGroup.Text>
              </InputGroup>
              <InputGroup label="How much water?" className="mb-3">
                <Form.Control type="number" name="weight" value={formInput.weight} placeholder="Water needed" onChange={handleChange} required />
                <InputGroup.Text>grams</InputGroup.Text>
              </InputGroup>
              <Button type="submit" className="btn-med">Submit</Button>
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
