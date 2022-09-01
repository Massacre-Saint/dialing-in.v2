/* eslint-disable react-hooks/exhaustive-deps */
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { deleteRecipe, getRecipe } from '../../../utils/data/apiData/userRecipes';
import ChooseGrindCard from '../../../components/create/recipes/ChooseGrindCard';
import ChooseMethodCard from '../../../components/create/recipes/ChooseMethodCard';
import ChooseTempCard from '../../../components/create/recipes/ChooseTempCard';
import CreateNameCard from '../../../components/create/recipes/CreateNameCard';

export default function CreateRecipe() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  // const [methods, setMethods] = useState([]);
  const [userRecipe, setUserRecipe] = useState({});
  // const [grinds, setGrinds] = useState([]);
  // const [steps, setSteps] = useState([]);
  const handleDelete = () => {
    if (window.confirm('Do you wish to cancel recipe?')) {
      deleteRecipe(firebaseKey).then(() => {
        router.push('/');
      });
    }
  };
  useEffect(() => {
    getRecipe(firebaseKey).then(setUserRecipe);
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={handleDelete}>
          Delete
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            Create Recipe
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        {!userRecipe.methodId ? (<ChooseMethodCard recipeObj={userRecipe} />) : (<ChooseMethodCard recipeObj={userRecipe} />)}
        {userRecipe.methodId ? (<ChooseGrindCard recipeObj={userRecipe} />) : ''}
        {userRecipe.grindId ? (<ChooseTempCard />) : ''}
        {Object.values(userRecipe).length > 5 ? (<CreateNameCard />) : ''}
      </div>
    </>
  );
}
