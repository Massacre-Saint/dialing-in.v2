import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import ChooseBrewTimeModal from '../../modal/ChooseBrewTimeModal';

export default function ChooseBrewTime({ recipeObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = () => {
    handleClose();
  };
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleShow}>
        <Card.Body>
          <Card.Title>Brew Time:</Card.Title>
          <Card.Text>{recipeObj.brewTime ? (convertTime(recipeObj.brewTime)) : ''}</Card.Text>
        </Card.Body>
      </Card>
      <ChooseBrewTimeModal recipeObj={recipeObj} onUpdate={onUpdate} handleClick={handleClick} handleShow={handleShow} handleClose={handleClose} show={show} />
    </>
  );
}
ChooseBrewTime.propTypes = {
  recipeObj: PropTypes.shape({
    methodId: PropTypes.string,
    firebaseKey: PropTypes.string,
    brewTime: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ChooseBrewTime.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    methodId: '',
    brewTime: 0,
  }),
};
