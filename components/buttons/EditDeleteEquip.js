import React from 'react';
import PropTypes from 'prop-types';
import { deleteEquipment } from '../../utils/data/apiData/recipeEquipment';

export default function EditDeleteEquip({ handleShow, obj, onUpdate }) {
  const handleDelete = () => {
    deleteEquipment(obj.firebaseKey);
    onUpdate();
  };
  return (
    <>
      <button type="button" onClick={handleDelete}>Delete</button>
      <button type="button" onClick={handleShow}>Edit</button>
    </>
  );
}
EditDeleteEquip.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
};
