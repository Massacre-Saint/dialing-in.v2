import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function AddEquipButton({ handleShow }) {
  return (
    <>
      <Button type="button" onClick={handleShow}>Add Equipment</Button>
    </>
  );
}
AddEquipButton.propTypes = {
  handleShow: PropTypes.func.isRequired,
};
