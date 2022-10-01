/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import MainNavBar from '../../../components/MainNavBar';
import FavRecipesCard from '../../../components/read/FavRecipesCard';
import { useAuth } from '../../../utils/context/authContext';
import { getFavoriteRecipes } from '../../../utils/data/apiData/favorites';

export default function FavRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };
  const getFavRecipes = () => {
    getFavoriteRecipes(user?.uid).then(setRecipes);
  };
  useEffect(() => {
    getFavRecipes();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Favorites
        </div>
      </Navbar>
      <div>
        {
          recipes.length
            ? (
              recipes.map((recipe) => (
                <FavRecipesCard key={recipe.recipeId} recipeObj={recipe} />
              ))
            )
            : (
              <div className="empty-content">
                <IconContext.Provider value={{ size: '4em', color: '#ccc5b9' }}>
                  <AiOutlineHeart />
                </IconContext.Provider>
                <p>Seems empty...<br /></p>
              </div>
            )
        }
      </div>
      <MainNavBar />
    </>
  );
}
