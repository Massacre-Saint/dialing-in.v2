import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Slider from 'react-input-slider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateRecipe } from '../../utils/data/apiData/userRecipes';

const initialSate = {
  brewTime: '',
};

export default function ChooseBrewTimeModal({
  show, recipeObj, handleClose, onUpdate,
}) {
  const [state, setState] = useState({ x: 60 });
  const [formInput, setFormInput] = useState(initialSate);
  useEffect(() => {
    if (recipeObj.brewTime) setFormInput(recipeObj);
  }, [recipeObj]);
  const convertTime = (total) => {
    if (recipeObj?.brewTime) {
      const result = new Date(total * 1000).toISOString().slice(14, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  const handleChange = (x) => {
    const { name, value } = x;
    // const convert = parseInt(value, 10);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleState = (x) => {
    setState(() => ({ ...state, x }));
    setFormInput(() => ({ ...initialSate, brewTime: x }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    updateRecipe(recipeObj.firebaseKey, payload).then(() => {
      onUpdate();
      handleClose();
    });
  };
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Time:{convertTime(state.x)}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <div>
                <Slider
                  className="time-slider"
                  axis="x"
                  x={state.x}
                  type="number"
                  xstep={15}
                  xmax={360}
                  name="brewTime"
                  value={state.x}
                  onChange={({ x }) => {
                    handleChange(x);
                    handleState(x);
                  }}
                  styles={{
                    thumb: {
                      width: 20,
                      height: 20,
                      backgroundColor: '#251605',
                    },
                    active: {
                      backgroundColor: '#251605',
                    },
                    track: {
                      width: 360,
                      backgroundColor: '#a38560',
                    },
                  }}
                />
              </div>
              <Button type="submit" variant="success">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
ChooseBrewTimeModal.propTypes = {
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    brewTime: PropTypes.number,
  }),
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
ChooseBrewTimeModal.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    brewTime: 0,
  }),
};
