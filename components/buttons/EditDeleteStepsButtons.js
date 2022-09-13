import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

export default function EditDeleteStepsButtons({
  handleDelete, handleShow, recipeObj,
}) {
  return (
    <div className="card-delete">
      {recipeObj.completed === true
        ? (
          ''
        )
        : (
          <>
            <button type="button" className="btn-stripped" onClick={handleDelete} aria-label="delete"><MdDeleteForever /></button>
            <button type="button" className="btn-stripped" onClick={handleShow} aria-label="edit"><AiFillEdit /></button>
          </>
        )}
    </div>
  );
}
EditDeleteStepsButtons.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  recipeObj: PropTypes.shape({
    completed: PropTypes.bool,
  }),
};
EditDeleteStepsButtons.defaultProps = {
  recipeObj: PropTypes.shape({
    completed: false,
  }),
};
