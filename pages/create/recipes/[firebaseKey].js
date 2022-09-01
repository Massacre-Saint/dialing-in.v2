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
  const [userRecipe, setUserRecipe] = useState({});
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
            {userRecipe.recipeName ? (userRecipe.recipeName) : ('Create Recipe')}
          </Navbar.Brand>
        </Container>
        <Nav.Link>
          Submit
        </Nav.Link>
      </Navbar>
      <div>
        {!userRecipe.methodId ? (<ChooseMethodCard recipeObj={userRecipe} />) : (<ChooseMethodCard recipeObj={userRecipe} />)}
        {userRecipe.methodId ? (<ChooseGrindCard recipeObj={userRecipe} />) : ''}
        {userRecipe.grindId ? (<ChooseTempCard recipeObj={userRecipe} />) : ''}
        {Object.values(userRecipe).length === 5 ? (<CreateNameCard recipeObj={userRecipe} />) : ''}
      </div>
    </>
  );
}
