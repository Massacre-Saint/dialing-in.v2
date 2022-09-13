import React from 'react';
import PropTypes from 'prop-types';

export default function AddEquipButton({ handleShow }) {
  return (
    <>
      <button type="button" className="btn-lg btn-span-lg-bottom" onClick={handleShow}>Add Equipment</button>
    </>
  );
}
AddEquipButton.propTypes = {
  handleShow: PropTypes.func.isRequired,
};
