import React from 'react';
import PropTypes from 'prop-types';

export default function EditDeleteStepsButtons({ handleDelete, handleShow, stepObj }) {
  return (
    <>
      {stepObj.completed
        ? (
          ''
        )
        : (
          <>
            <button type="button" onClick={handleDelete}>Delete</button>
            <button type="button" onClick={handleShow}>Edit</button>
          </>
        )}
    </>
  );
}
EditDeleteStepsButtons.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  stepObj: PropTypes.shape({
    uid: PropTypes.string,
    completed: PropTypes.bool,
  }),
};
EditDeleteStepsButtons.defaultProps = {
  stepObj: PropTypes.shape({
    uid: '',
    completed: false,
  }),
};
