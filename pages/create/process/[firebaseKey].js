/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import PublishRecipeButton from '../../../components/buttons/PublishRecipeButton';
import ViewAllSteps from '../../../components/buttons/ViewAllSteps';
import UserProcessModal from '../../../components/modal/UserProcessModal';
import StepCard from '../../../components/read/StepCard';
import { useAuth } from '../../../utils/context/authContext';
import { getAllData } from '../../../utils/data/apiData/mergeData';
import { getSteps } from '../../../utils/data/apiData/steps';

export default function CreateProcess() {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { firebaseKey } = router.query;
  const renderRecipe = () => {
    getAllData(firebaseKey).then((obj) => setRecipe(obj));
    getSteps(firebaseKey).then((array) => setSteps(array));
  };
  const sortedSteps = (array) => {
    const orderedSteps = array.sort((a, b) => ((a.order > b.order) ? 1 : -1));
    return orderedSteps;
  };
  const handleBack = (() => {
    setShow(false);
    router.push(`/create/recipes/${recipe.firebaseKey}`);
  });
  const handleShow = () => {
    if (recipe.uid) {
      if (!recipe.completed) {
        setShow(true);
      } else router.push('/read/recipes/userRecipes');
    } else {
      router.back();
    }
  };
  const handleSave = () => {
    setShow(false);
    router.push('/');
  };
  const handleEquipment = () => {
    router.push(`/read/equipment/${recipe.firebaseKey}`);
  };
  const checkArray = () => {
    const query = steps.map((step) => step.direction);
    query.filter((string) => {
      if (string === 'trash') { console.warn('met'); }
      console.warn('not met');
      return false;
    });
  };
  useEffect(() => {
    renderRecipe();
    checkArray();
  }, [user]);
  return (
    <>
      {
      recipe.methodObject
        ? (
          <>
            <Navbar>
              <Nav.Link onClick={handleShow}>
                Back
              </Nav.Link>
              <Container>
                <Navbar.Brand>
                  {recipe.recipeName ? (recipe.recipeName) : ('Create Recipe')}
                </Navbar.Brand>
              </Container>
              <Nav.Link onClick={handleEquipment}>
                Equipment
              </Nav.Link>
            </Navbar>
            <div>
              <div>
                <div className="circles">
                  <div className="circle"><span className="circle-content">{recipe.dose} g </span></div>
                  <div className="circle"><span className="circle-content">{recipe.weight} g</span></div>
                  <div className="circle"><span className="circle-content">{recipe.waterTemp} F°</span></div>
                </div>
                <div className="circle-footer">
                  <div>Coffe</div>
                  <div>Water</div>
                  <div>Temp</div>
                </div>
                <div>
                  <div>
                    <ul>
                      <ul>Recipe: {recipe.methodObject.name}</ul>
                      <ul>Brew Time: {recipe?.brewTime}</ul>
                      <ul> Grind Size: {recipe.grindObject.grindSize}</ul>
                      {!recipe.uid
                        ? ('')
                        : (<ul>Author: {recipe?.userObject?.name}</ul>)}
                    </ul>
                  </div>
                  <div>
                    <h1>Directions:</h1>
                  </div>
                  <div>
                    <div className="directions">
                      {
                        steps.length
                          ? (
                            sortedSteps(steps).map((step) => (
                              <StepCard check={checkArray} key={step.firebaseKey} stepObj={step} onUpdate={renderRecipe} stepArray={steps} />
                            ))
                          )
                          : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
              {
                !recipe.uid
                  ? ('')
                  : (<ViewAllSteps recipe={recipe} />)
              }
              <PublishRecipeButton onUpdate={renderRecipe} recipe={recipe} steps={steps} />
            </div>
            <UserProcessModal handleBack={handleBack} show={show} handleClose={handleClose} handleSave={handleSave} />
          </>
        )
        : (
          ''
        )
    }
    </>
  );
}
