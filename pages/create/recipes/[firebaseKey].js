/* eslint-disable react-hooks/exhaustive-deps */
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { deleteRecipe, getRecipe, updateRecipe } from '../../../utils/data/apiData/userRecipes';
import ChooseGrindCard from '../../../components/create/recipes/ChooseGrindCard';
import ChooseMethodCard from '../../../components/create/recipes/ChooseMethodCard';
import ChooseTempCard from '../../../components/create/recipes/ChooseTempCard';
import CreateNameCard from '../../../components/create/recipes/CreateNameCard';
import { createProcess, deleteProcess, getProcess } from '../../../utils/data/apiData/process';

export default function CreateRecipe() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [userRecipe, setUserRecipe] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    handleClose();
    router.push('/');
    deleteRecipe(firebaseKey);
    deleteProcess(userRecipe.processId);
  };
  const handleClick = () => {
    handleClose();
  };
  const create = (process) => {
    const payload = {
      processId: process.firebaseKey,
      completed: false,
    };
    updateRecipe(process.recipeId, payload);
  };
  const handleSubmit = () => {
    const payload = {
      recipeId: userRecipe.firebaseKey,
    };
    if (!userRecipe.processId) {
      createProcess(payload).then((processObj) => {
        getProcess(processObj.data.firebaseKey).then((process) => {
          create(process);
        });
      });
    }
    router.push(`/create/process/${userRecipe.firebaseKey}`);
  };
  const renderRecipe = () => {
    getRecipe(firebaseKey).then((obj) => {
      setUserRecipe(obj);
    });
  };
  useEffect(() => {
    renderRecipe();
  }, [user]);
  return (
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
        <Nav.Link onClick={handleSubmit}>
          {userRecipe.recipeName ? 'Submit' : ''}
        </Nav.Link>
      </Navbar>
      <div>
        {!userRecipe.methodId ? (<ChooseMethodCard recipeObj={userRecipe} />) : (<ChooseMethodCard recipeObj={userRecipe} />) }
        {userRecipe.methodId ? (<ChooseGrindCard recipeObj={userRecipe} />) : ''}
        {userRecipe.grindId ? (<ChooseTempCard onUpdate={renderRecipe} recipeObj={userRecipe} />) : ''}
        {Object.values(userRecipe).length < 5 ? '' : (<CreateNameCard onUpdate={renderRecipe} recipeObj={userRecipe} />)}
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Hold Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Going back will delete recipe. Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
