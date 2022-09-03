import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';

import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';
import { useAuth } from '../../../utils/context/authContext';
import { createRecipe, getUserRecipes, getRecipe } from '../../../utils/data/apiData/userRecipes';
import Recipes from '../../../components/read/Recipes';

export default function UserRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const getRoutedRecipes = () => {
    getUserRecipes(user.uid).then(setRecipes);
  };
  const handleClick = () => {
    getRoutedRecipes();
    const payload = {
      uid: user.uid,
    };
    createRecipe(payload).then((recipeObj) => {
      getRecipe(recipeObj.data.firebaseKey).then((obj) => {
        router.push(`/create/recipes/${obj.firebaseKey}`);
      });
    });
  };
  return (
    <>
      <Navbar>
        <Nav.Link onClick={router.push('/')}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            My Recipes
          </Navbar.Brand>
        </Container>
        <Nav.Link onClick={handleClick}>
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        {
          recipes.length
            ? (
              recipes.map((recipe) => (
                <Recipes key={recipe.fbKey} recipeObj={recipe} />
              ))
            )
            : (
              <h1>No Recipes</h1>
            )
        }
      </div>
    </>
  );
}
