/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { BsFillPlayFill, BsStopFill } from 'react-icons/bs';
import { BiReset } from 'react-icons/bi';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { RatingsCommentsModal } from '../modal';

export default function Stopwatch({ recipe }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <>
      <div className="stopwatch">
        <div className="circle-cont">
          <ProgressBar color="brown" animated bsPrefix="progress" max={recipe.brew_time} now={time / 1000} />
          <div className="progress-circle">
            <div className="stopwatch-numbers">
              <span>{(`0${Math.floor((time / 60000) % 60)}`).slice(-2)}:</span>
              <span>{(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}</span>
            </div>
          </div>
        </div>
        <div className="stopwatch-buttons">
          <button type="button" aria-label="stop" className="circle-btn stop-btn" onClick={() => setRunning(false)}><BsStopFill /></button>
          <button type="button" aria-label="start" className="circle-btn start-btn" onClick={() => setRunning(true)}><BsFillPlayFill /></button>
          <button type="button" aria-label="stop" className="circle-btn reset-btn" onClick={() => setTime(0)}><BiReset /></button>
        </div>
      </div>
      <RatingsCommentsModal handleClose={handleClose} show={show} />
    </>
  );
}

Stopwatch.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    brew_time: PropTypes.number,
    default: PropTypes.bool,
    dose: PropTypes.number,
    published: PropTypes.bool,
    recipe_name: PropTypes.string,
    weight: PropTypes.number,
  }).isRequired,
};
