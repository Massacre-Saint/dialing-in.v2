/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useAuth } from '../../../../utils/context/authContext';
import { getSteps } from '../../../../utils/data/apiData/steps';
import { getRecipe } from '../../../../utils/data/apiData/userRecipes';
import StepCard from '../../../../components/read/StepCard';
import StepModal from '../../../../components/modal/StepModal';
import GuidedSteps from '../../../../components/read/GuidedSteps';

export default function ShowSteps() {
  const { user } = useAuth();
  const [steps, setSteps] = useState([]);
  const [recipe, setRecipe] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const handleBack = () => {
    router.back();
  };
  const renderSteps = () => {
    getSteps(firebaseKey).then((array) => setSteps(array));
    getRecipe(firebaseKey).then(setRecipe);
  };
  const sortedSteps = (array) => {
    const orderedSteps = array.sort((a, b) => ((a.order > b.order) ? 1 : -1));
    return orderedSteps;
  };
  useEffect(() => {
    renderSteps();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Steps
        </div>
      </Navbar>
      {
        steps.length
          ? (
            <>
              <div>
                <GuidedSteps />
              </div>
              {
                sortedSteps(steps).map((step) => (
                  <StepCard onUpdate={renderSteps} key={step.firebaseKey} stepObj={step} recipeObj={recipe} />
                ))
              }
            </>
          )
          : (
            <div className="empty-content-steps">
              <p>Seems Empty...<br />Add steps below</p>
              <IconContext.Provider value={{ size: '4em', color: '#F8F4E3' }}>
                <AiOutlineArrowDown />
              </IconContext.Provider>
            </div>
          )
      }
      {recipe.completed === true
        ? (
          ''
        )
        : (
          <StepModal onUpdate={renderSteps} stepArray={steps} recipeObj={recipe} />
        )}
    </>
  );
}
