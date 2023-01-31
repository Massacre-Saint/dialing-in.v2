/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Image, Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { updateRecipe } from '../../utils/data/apiData/recipes';

const initialSate = {
  dose: '',
};
export default function Grind({ grindObj, recipe }) {
  const router = useRouter();
  const id = router.query.data;
  const [formInput, setFormInput] = useState(initialSate);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (recipe.dose) setFormInput(recipe);
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convert = parseInt(value, 10);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: convert,
    }));
  };

  const handleClick = () => {
    const payload = {
      grindId: grindObj.id,
      methodId: recipe.method_id.id,
      dose: recipe.dose,
      recipeName: recipe.recipe_name,
      brewTime: recipe.brew_time,
      weight: recipe.weight,
    };
    updateRecipe(id, payload);
    handleShow();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      grindId: grindObj.id,
      methodId: recipe.method_id.id,
    };
    updateRecipe(id, payload).then(() => {
      router.push(`/create/recipes/${id}`);
      handleClose();
    });
  };
  return (
    <div className="grind-container">
      <div>
        <Image className="grind-circle-content" layout="responsive" src={grindObj.image_url} onClick={handleClick} />
      </div>
      <h4>{grindObj.grind_size}</h4>
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
          <Offcanvas.Title>Choose Dose</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control type="number" name="dose" value={formInput.dose} onChange={handleChange} required aria-label="Amount (to the nearest gram)" />
                <InputGroup.Text>grams</InputGroup.Text>
              </InputGroup>
              <div>
                <Button className="btn-med" type="submit">Submit</Button>
              </div>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
Grind.propTypes = {
  grindObj: PropTypes.shape(
    {
      id: PropTypes.number,
      image_url: PropTypes.string,
      grind_size: PropTypes.string,
      order: PropTypes.number,
    },
  ),
  recipe: PropTypes.shape({
    id: PropTypes.number,
    brew_time: PropTypes.number,
    weight: PropTypes.number,
    dose: PropTypes.number,
    recipe_name: PropTypes.string,
    published: PropTypes.bool,
    method_id: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    grind_id: PropTypes.shape({
      grind_size: PropTypes.string,
      image_url: PropTypes.string,
    }),
  }).isRequired,
};
Grind.defaultProps = {
  grindObj: PropTypes.shape(
    {
      id: '',
      imageUrl: '',
      grindSize: '',
      specified: false,
      order: 0,
    },
  ),
};
