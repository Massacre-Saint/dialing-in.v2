/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../../utils/context/authContext';
import { getSteps } from '../../../../utils/data/apiData/steps';
import { getRecipe } from '../../../../utils/data/apiData/userRecipes';
import StepCard from '../../../../components/read/StepCard';
import StepModal from '../../../../components/modal/StepModal';

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
      <Navbar>
        <Nav.Link onClick={handleBack}>
          Back
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            Directions
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        {
      steps.length
        ? (
          sortedSteps(steps).map((step) => (
            <StepCard onUpdate={renderSteps} key={step.firebaseKey} stepObj={step} />
          ))
        )
        : 'Add Steps'
    }
      </div>
      <StepModal onUpdate={renderSteps} stepArray={steps} recipeObj={recipe} />
    </>
  );
}
