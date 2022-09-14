/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IconContext } from 'react-icons';
import MainNavbar from '../../../components/MainNavBar';
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
  const handleBack = () => {
    router.push('/');
  };
  useEffect(() => {
    getRoutedRecipes();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Recipes
        </div>
        <Nav.Link onClick={handleClick} className="nav-cta">
          <IconContext.Provider value={{ size: '2em' }}>
            <IoIosAddCircleOutline />
          </IconContext.Provider>
        </Nav.Link>
      </Navbar>
      <div>
        {
          recipes.length
            ? (
              recipes.map((recipe) => (
                <Recipes render={getRoutedRecipes} key={recipe.firebaseKey} recipeObj={recipe} />
              ))
            )
            : (
              <h1>No Recipes</h1>
            )
        }
      </div>
      <MainNavbar />
    </>
  );
}
