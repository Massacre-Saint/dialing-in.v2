import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { updateRecipe } from '../../utils/data/apiData/recipes';

const initialSate = {
  recipe_name: '',
};

export default function CreateNameModal({ recipeObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);

  useEffect(() => {
    if (recipeObj.recipe_name) setFormInput(recipeObj);
  }, [recipeObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      dose: recipeObj.dose,
      brewTime: recipeObj.brew_time,
      grindId: recipeObj.grind_id.id,
      methodId: recipeObj.method_id.id,
      weight: recipeObj.weight,
    };
    updateRecipe(recipeObj.id, payload).then(() => {
      onUpdate();
      router.push(`/create/recipes/${recipeObj.id}`);
      handleClose();
    });
  };
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleShow}>
        <Card.Body>
          <Card.Title>Recipe Name</Card.Title>
          <Card.Text>{recipeObj.recipe_name}</Card.Text>
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
              <FloatingLabel controlId="floatingInput1" label="Create Recipe Name" className="mb-3">
                <Form.Control type="text" placeholder="Example..." name="recipe_name" value={formInput.recipe_name} onChange={handleChange} required />
              </FloatingLabel>
              <Button type="submit" className="btn-med">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
CreateNameModal.propTypes = {
  recipeObj: PropTypes.shape({
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
