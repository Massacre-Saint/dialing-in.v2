import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function UserProcessModal({
  show, handleClose, handleBack, handleSave,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>Edit or Save Changes and Exit?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBack}>
            Edit
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
UserProcessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
