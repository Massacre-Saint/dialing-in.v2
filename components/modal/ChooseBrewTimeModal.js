import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Slider from 'react-input-slider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateRecipe } from '../../utils/data/apiData/recipes';

const initialSate = {
  brew_time: 60,
};

export default function ChooseBrewTimeModal({
  show, recipeObj, handleClose, onUpdate,
}) {
  const [state, setState] = useState({ x: 60 });
  const [formInput, setFormInput] = useState(initialSate);
  useEffect(() => {
    if (recipeObj.brew_time) setFormInput(recipeObj);
  }, [recipeObj]);
  const convertTime = (total) => {
    if (recipeObj?.brew_time) {
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
    setFormInput(() => ({ ...initialSate, brew_time: x }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    updateRecipe(recipeObj.id, payload).then(() => {
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
                  name="brew_time"
                  value={state.x}
                  onChange={({ x }) => {
                    handleChange(x);
                    handleState(x);
                  }}
                  styles={{
                    thumb: {
                      width: 20,
                      height: 20,
                      backgroundColor: '#eb5e28',
                    },
                    active: {
                      backgroundColor: '#eb5e28',
                    },
                    track: {
                      width: 360,
                      backgroundColor: '#ccc5b9',
                    },
                  }}
                />
              </div>
              <Button type="submit" className="btn-med">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
ChooseBrewTimeModal.propTypes = {
  recipeObj: PropTypes.shape({
    id: PropTypes.number,
    brew_time: PropTypes.number,
  }),
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
ChooseBrewTimeModal.defaultProps = {
  recipeObj: PropTypes.shape({
    id: '',
    brew_time: 0,
  }),
};
