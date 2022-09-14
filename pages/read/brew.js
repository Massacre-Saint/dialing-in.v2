/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import Stopwatch from '../../components/Stopwatch';
import { useAuth } from '../../utils/context/authContext';
import { getAllData } from '../../utils/data/apiData/mergeData';
import { getSteps } from '../../utils/data/apiData/steps';
import StepCard from '../../components/read/StepCard';

export default function Brew() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  console.warn(firebaseKey);
  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const { user } = useAuth();
  const renderRecipe = () => {
    getAllData(firebaseKey).then((obj) => setRecipe(obj));
    getSteps(firebaseKey).then((array) => setSteps(array));
  };
  const sortedSteps = (array) => {
    const orderedSteps = array.sort((a, b) => ((a.order > b.order) ? 1 : -1));
    return orderedSteps;
  };
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    renderRecipe();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Equipment
        </div>
      </Navbar>
      <div><Stopwatch /></div>
      <div className="directions-title">
        <h1>Directions:</h1>
      </div>
      <div className="directions">
        {sortedSteps(steps).map((step) => (
          <StepCard key={step.firebaseKey} stepObj={step} onUpdate={renderRecipe} stepArray={steps} recipeObj={recipe} />
        ))}
      </div>
    </>
  );
}
