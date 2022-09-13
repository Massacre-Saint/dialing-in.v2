/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons/lib';
import { getMethodRecipesDefault, getMethodRecipesUser } from '../../../utils/data/apiData/mergeData';
import { createRecipe, getRecipe } from '../../../utils/data/apiData/userRecipes';
import Recipes from '../../../components/read/Recipes';
import { useAuth } from '../../../utils/context/authContext';
import MainNavBar from '../../../components/MainNavBar';
import DefaultRecipes from '../../../components/read/DefaultRecipes';

export default function MethodRecipes() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [method, setMethod] = useState({});
  const getRoutedRecipes = () => {
    getMethodRecipesDefault(firebaseKey).then((methodObj) => {
      setMethod(methodObj);
      setRecipes(methodObj.defaultRecipes);
    });
    getMethodRecipesUser(firebaseKey).then((methodObj) => {
      setUserRecipes(methodObj.userRecipes);
    });
  };
  const handleClick = () => {
    if (!user) {
      router.push('/settings');
    } else {
      getRoutedRecipes();
      const payload = {
        uid: user.uid,
        methodId: method.firebaseKey,
      };
      createRecipe(payload).then((recipeObj) => {
        getRecipe(recipeObj.data.firebaseKey).then((obj) => {
          router.push(`/create/recipes/${obj.firebaseKey}`);
        });
      });
    }
  };
  useEffect(() => {
    getRoutedRecipes();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={router.back}>
          <button className="btn-sm" type="button">&#8249; Methods</button>
        </Nav.Link>
        <div className="page-title">
          {method.name}
        </div>
        <Nav.Link onClick={handleClick} className="nav-cta">
          <IconContext.Provider value={{ size: '2em' }}>
            <IoIosAddCircleOutline />
          </IconContext.Provider>
        </Nav.Link>
      </Navbar>
      <div>
        {
          userRecipes.length && user
            ? (
              userRecipes.map(((recipe) => (
                <Recipes key={recipe.firebaseKey} methodObj={method} recipeObj={recipe} />
              )))
            )
            : ('')
        }
        {recipes.map((recipe) => (
          <DefaultRecipes key={recipe.firebaseKey} methodObj={method} recipeObj={recipe} />
        ))}
      </div>
      <MainNavBar />
    </>
  );
}
