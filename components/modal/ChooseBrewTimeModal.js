import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { updateRecipe } from '../../utils/data/apiData/userRecipes';

const initialSate = {
  brewTime: '',
};

export default function ChooseBrewTimeModal({
  show, recipeObj, handleClose, onUpdate,
}) {
  const [formInput, setFormInput] = useState(initialSate);
  useEffect(() => {
    if (recipeObj.brewTime) setFormInput(recipeObj);
  }, [recipeObj]);
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
      handleClose();
    });
  };
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Descripe this step</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput1" label="Total Brew Time?" className="mb-3">
                <Form.Control type="number" min={34} placeholder="Typically around 205" name="brewTime" value={formInput.brewTime} onChange={handleChange} required />
              </FloatingLabel>
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
ChooseBrewTimeModal.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    brewTime: PropTypes.number,
  }),
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
ChooseBrewTimeModal.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    brewTime: 0,
  }),
};
