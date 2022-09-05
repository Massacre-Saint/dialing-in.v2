/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StepCard from '../../../components/read/StepCard';
import { useAuth } from '../../../utils/context/authContext';
import { getAllData } from '../../../utils/data/apiData/mergeData';
import { getSteps } from '../../../utils/data/apiData/steps';
import { updateRecipe } from '../../../utils/data/apiData/userRecipes';

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
      setShow(true);
    } else {
      router.back();
    }
  };
  const handleSave = () => {
    setShow(false);
    router.push('/');
  };
  const handleClick = () => {
    router.push({
      pathname: '/create/recipes/steps/showSteps',
      query: { firebaseKey },
    });
  };
  const handleSubmit = () => {
    const payload = {
      completed: true,
    };
    updateRecipe(recipe.firebaseKey, payload).then(() => {
      renderRecipe();
      router.push('/read/recipes/userRecipes');
    });
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
                <div>
                  <div><span>Coffee: </span>{recipe.dose} g</div>
                  <div><span>Water: </span>{recipe.weight} g</div>
                  <div><span>Water: </span>{recipe.waterTemp} F°</div>
                  <h2>Ratio</h2>
                </div>
                <div>
                  <div>
                    <ul>
                      <ul>Recipe: {recipe.methodObject.name}</ul>
                      <ul>Brew Time: {recipe?.brewTime}</ul>
                      <ul> Grind Size: {recipe.grindObject.grindSize}</ul>
                      <ul>Author: {recipe?.userObject?.name}</ul>
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
                          : 'Add Steps'
                      }
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" onClick={handleClick}>{steps.length ? 'View Steps' : 'Add Step'}</button>
              <button type="button" onClick={handleSubmit}>{steps.length > 5 && !recipe.completed ? 'Publish' : ''}</button>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton />
              <Modal.Body>Back to Edit or Save as Draft?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleBack}>
                  Edit
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
        : (
          ''
        )
    }
    </>
  );
}
