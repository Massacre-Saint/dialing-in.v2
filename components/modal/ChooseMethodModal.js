import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function ChooseMethodModal({
  show, handleClose, handleReset, handleKeep,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Hold Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Choosing another method will reset recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleKeep}>
            Keep
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
ChooseMethodModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleKeep: PropTypes.func.isRequired,
};
