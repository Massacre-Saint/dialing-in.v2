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

export default function CreateProcess() {
  const { user } = useAuth();
  const [userRecipe, setUserRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { firebaseKey } = router.query;
  const renderRecipe = () => {
    getAllData(firebaseKey).then((obj) => setUserRecipe(obj));
    getSteps(firebaseKey).then((array) => setSteps(array));
  };
  const sortedSteps = (array) => {
    const orderedSteps = array.sort((a, b) => ((a.order > b.order) ? 1 : -1));
    return orderedSteps;
  };
  useEffect(() => {
    renderRecipe();
  }, [user]);
  const handleBack = (() => {
    setShow(false);
    router.push(`/create/recipes/${userRecipe.firebaseKey}`);
  });
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
  // const handleDelete = () => {
  //   getRecipe(userRecipe.firebaseKey).then((obj) => {
  //     deleteProcess(obj.firebaseKey);
  //     deleteRecipeSteps(obj.firebaseKey);
  //     router.push('/');
  //   });
  // };
  return (
    <>
      {
      userRecipe.methodObject
        ? (
          <>
            <Navbar>
              <Nav.Link onClick={handleShow}>
                Back
              </Nav.Link>
              <Container>
                <Navbar.Brand>
                  {userRecipe.recipeName ? (userRecipe.recipeName) : ('Create Recipe')}
                </Navbar.Brand>
              </Container>
              <Nav.Link>
                Equipment
              </Nav.Link>
            </Navbar>
            <div>
              <div>
                <div>
                  <div><span>Cofee: </span>{userRecipe.dose} g</div>
                  <div><span>Water: </span>{userRecipe.weight} g</div>
                  <div><span>Water: </span>{userRecipe.waterTemp} F°</div>
                  <h2>Ratio</h2>
                </div>
                <div>
                  <div>
                    <ul>
                      <ul>Recipe: {userRecipe.methodObject.name}</ul>
                      <ul>Brew Time: {userRecipe?.brewTime}</ul>
                      <ul> Grind Size: {userRecipe.grindObject.grindSize}</ul>
                      <ul>Author: {userRecipe.userObject.name}</ul>
                    </ul>
                  </div>
                  <div>
                    <h1>Directions:</h1>
                  </div>
                  <div>
                    <div>
                      {
                        steps.length
                          ? (
                            sortedSteps(steps).map((step) => (
                              <StepCard key={step.firebaseKey} stepObj={step} onUpdate={renderRecipe} stepArray={steps} />
                            ))
                          )
                          : 'Add Steps'
                      }
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" type="button" onClick={handleClick}>{steps.length ? 'View Steps' : 'Add Step'}</Button>
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
