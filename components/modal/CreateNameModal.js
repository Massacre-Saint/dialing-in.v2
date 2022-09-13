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
  recipeName: '',
};

export default function CreateNameModal({ recipeObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);

  useEffect(() => {
    if (recipeObj.recipeName) setFormInput(recipeObj);
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
          <Card.Title>Recipe Name</Card.Title>
          <Card.Text>{recipeObj.recipeName}</Card.Text>
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
                <Form.Control type="text" placeholder="Example..." name="recipeName" value={formInput.recipeName} onChange={handleChange} required />
              </FloatingLabel>
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
CreateNameModal.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    recipeName: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};
CreateNameModal.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    recipeName: '',
  }),
  onUpdate: () => {},
};
