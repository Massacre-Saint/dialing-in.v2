/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, InputGroup } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { updateRecipe } from '../../utils/data/apiData/recipes';

const initialSate = {
  weight: '',
};

export default function WaterWeightModal({ recipe, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);

  useEffect(() => {
    if (recipe.weight) setFormInput(recipe);
  }, [recipe]);

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
      brewTime: recipe.brew_time,
      dose: recipe.dose,
      recipeName: recipe.recipe_name,
      grindId: recipe.grind_id.id,
      methodId: recipe.method_id.id,
    };
    updateRecipe(recipe.id, payload).then(() => {
      onUpdate();
      router.push(`/create/recipes/${recipe.id}`);
      handleClose();
    });
  };
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleShow}>
        <Card.Body>
          <Card.Title>Water:</Card.Title>
          <Card.Text>{recipe?.weight} grams</Card.Text>
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
          <Offcanvas.Title>How Much Will Recipe Yield?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
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
WaterWeightModal.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    dose: PropTypes.number,
    brew_time: PropTypes.number,
    recipe_name: PropTypes.string,
    grind_id: PropTypes.shape({
      id: PropTypes.number,
      grind_size: PropTypes.string,
      image_url: PropTypes.string,
    }),
    method_id: PropTypes.shape({
      id: PropTypes.number,
      grind_size: PropTypes.string,
      image_url: PropTypes.string,
    }),
    weight: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
