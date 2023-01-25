/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import MainNavbar from '../../../components/MainNavBar';
import { useAuth } from '../../../utils/context/authContext';
import Recipes from '../../../components/read/Recipes';
import { getYourRecipes } from '../../../utils/data/apiData/owner';
import { createRecipe, getRecipe } from '../../../utils/data/apiData/recipes';

export default function UserRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const getRoutedRecipes = () => {
    getYourRecipes(user.uid).then(setRecipes);
  };
  const handleClick = () => {
    getRoutedRecipes();
    const payload = {
      uid: user.uid,
    };
    createRecipe(payload).then((recipeObj) => {
      getRecipe(recipeObj.data.id).then((obj) => {
        router.push(`/create/recipes/${obj.id}`);
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
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        {
          recipes.length
            ? (
              recipes.map((recipe) => (
                <Recipes render={getRoutedRecipes} key={recipe.id} recipeObj={recipe} />
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
