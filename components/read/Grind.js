/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { updateRecipe, getRecipe } from '../../utils/data/apiData/userRecipes';
import { useAuth } from '../../utils/context/authContext';

const initialSate = {
  dose: '',
};
export default function Grind({ grindObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const firebaseKey = router.query.data;
  const [userRecipe, setUserRecipe] = useState({});
  const [formInput, setFormInput] = useState(initialSate);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      ...userRecipe,
      grindId: grindObj.fbKey,
    };
    updateRecipe(userRecipe.firebaseKey, payload);
    handleShow();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    updateRecipe(userRecipe.firebaseKey, payload).then(() => {
      router.push(`/create/recipes/${userRecipe.firebaseKey}`);
      handleClose();
    });
  };
  useEffect(() => {
    getRecipe(firebaseKey).then(setUserRecipe);
  }, [user]);
  return (
    <div>
      <Image width="200x" thumbnail src={grindObj.imageUrl} onClick={handleClick} />
      <h4>{grindObj.grindSize}</h4>
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
              <FloatingLabel controlId="floatingInput1" label="How many grams of coffee?" className="mb-3">
                <Form.Control type="number" name="dose" value={formInput.dose} onChange={handleChange} required />
              </FloatingLabel>
              <div>
                <Button type="submit" variant="success">Submit</Button>
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
      fbKey: PropTypes.string,
      imageUrl: PropTypes.string,
      grindSize: PropTypes.string,
      specified: PropTypes.bool,
    },
  ),
};
Grind.defaultProps = {
  grindObj: PropTypes.shape(
    {
      fbKey: '',
      imageUrl: '',
      grindSize: '',
      specified: false,
    },
  ),
};
