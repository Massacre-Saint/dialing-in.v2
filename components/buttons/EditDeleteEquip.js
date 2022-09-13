import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { deleteEquipment } from '../../utils/data/apiData/recipeEquipment';

export default function EditDeleteEquip({ handleShow, obj, onUpdate }) {
  const handleDelete = () => {
    deleteEquipment(obj.firebaseKey);
    onUpdate();
  };
  return (
    <div className="card-delete-btn">
      <button type="button" aria-label="delete" className="btn-stripped" onClick={handleDelete}><MdDeleteForever /></button>
      <button type="button" aria-label="edit" className="btn-stripped" onClick={handleShow}><AiFillEdit /></button>
    </div>
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
