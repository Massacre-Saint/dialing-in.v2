/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsInfoCircle } from 'react-icons/bs';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getMethodRecipesDefault, getMethodRecipesUser } from '../../../utils/data/apiData/mergeData';
import { createRecipe, getRecipe } from '../../../utils/data/apiData/userRecipes';
import Recipes from '../../../components/read/Recipes';
import { useAuth } from '../../../utils/context/authContext';
import MainNavBar from '../../../components/MainNavBar';
import DefaultRecipes from '../../../components/read/DefaultRecipes';
import MethodInfoModal from '../../../components/modal/MethodInfoModal';

export default function MethodRecipes() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [method, setMethod] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        <Nav.Link className="nav-info">
          <BsInfoCircle onClick={handleShow} />
        </Nav.Link>
        <Nav.Link onClick={handleClick} className="nav-cta">
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      {userRecipes.length && user
        ? (
          userRecipes.map(((recipe) => (
            <Recipes key={recipe.firebaseKey} methodObj={method} recipeObj={recipe} />
          )))
        )
        : ('')}
      {recipes.map((recipe) => (
        <DefaultRecipes key={recipe.firebaseKey} methodObj={method} recipeObj={recipe} />
      ))}
      <MethodInfoModal method={method} show={show} handleClose={handleClose} />
      <MainNavBar />
    </>
  );
}
