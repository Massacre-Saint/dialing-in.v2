import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { createEquipment, updateEquipment } from '../../utils/data/apiData/recipeEquipment';

const initialSate = {
  type: '',
  name: '',
  setting: '',
};

export default function EquipmentForm({ obj, onUpdate, handleClose }) {
  const [formInput, setFormInput] = useState(initialSate);
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    console.warn(obj);
    if (obj.firebaseKey) setFormInput(obj);
    else { setFormInput(initialSate); }
  }, [obj]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      recipeId: firebaseKey,
    };
    if (!obj) {
      createEquipment(payload).then(() => {
        onUpdate();
      });
    } else {
      updateEquipment(obj.firebaseKey, payload).then(() => {
        onUpdate();
      });
    }
    handleClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Equipment Name" className="mb-3">
          <Form.Control type="text" value={formInput.name} onChange={handleChange} name="name" required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="What kind?" className="mb-3">
          <Form.Control type="text" value={formInput.type} onChange={handleChange} name="type" required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Certain setting?" className="mb-3">
          <Form.Control type="text" value={formInput.setting} onChange={handleChange} name="setting" />
        </FloatingLabel>
        <Button type="submit" variant="success">Submit</Button>
      </Form>
    </div>
  );
}
EquipmentForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    recipeId: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    setting: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
EquipmentForm.defaultProps = {
  obj: PropTypes.shape({
    firebaseKey: '',
    recipeId: '',
    name: '',
    type: '',
    setting: '',
  }),
};
