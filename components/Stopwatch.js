/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getAllData } from '../utils/data/apiData/mergeData';
import RatingsCommentsModal from './modal/RatingsCommentsModal';

export default function Stopwatch() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [recipe, setRecipe] = useState({});
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const getRecipeTime = () => {
    getAllData(firebaseKey).then((obj) => setRecipe(obj));
  };
  useEffect(() => {
    getRecipeTime();
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
          <ProgressBar color="brown" animated bsPrefix="progress" max={recipe.brewTime} now={time / 1000} />
          <div className="progress-circle">
            <div className="stopwatch-numbers">
              <span>{(`0${Math.floor((time / 60000) % 60)}`).slice(-2)}:</span>
              <span>{(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}</span>
            </div>
          </div>
        </div>
        <div className="stopwatch-buttons">
          <button type="button" className="btn-med start-btn" onClick={() => setRunning(true)}>Start</button>
          <button type="button" className="btn-med stop-btn" onClick={() => setRunning(false)}>Stop</button>
          <button type="button" className="btn-sm reset-btn" onClick={() => setTime(0)}>Reset</button>
        </div>
      </div>
      <RatingsCommentsModal handleClose={handleClose} show={show} />
    </>
  );
}
