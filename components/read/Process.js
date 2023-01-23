/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { GiManualMeatGrinder } from 'react-icons/gi';
import { TbCoffeeOff } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import { useAuth } from '../../utils/context/authContext';
import PublishRecipeButton from '../buttons/PublishRecipeButton';
import ViewAllSteps from '../buttons/ViewAllSteps';
import MainNavBar from '../MainNavBar';
import UserProcessModal from '../modal/UserProcessModal';
import StepCard from './StepCard';
import BrewButton from '../buttons/BrewButton';
import FavoriteButton from '../buttons/FavoriteButton';
import { getSingleOwnerRecipe } from '../../utils/data/apiData/owner';
import { getSteps } from '../../utils/data/apiData/steps';
import { createFavoriteRecipe, deleteFavoriteRecipe, getSingleFavoriteRecipe } from '../../utils/data/apiData/favorites';
import { updateRecipe } from '../../utils/data/apiData/userRecipes';
import { getRecipe } from '../../utils/data/apiData/recipes';

export default function Process() {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const router = useRouter();
  const [favoriteState, setFavoriteState] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { id } = router.query;

  // const renderRecipe = () => {
  //   getAllData(firebaseKey).then((obj) => setRecipe(obj));
  //   getSteps(firebaseKey).then((array) => setSteps(array));
  // };
  const renderRecipe = () => {
    getRecipe(id).then((obj) => {
      if (!obj.default) {
        getSingleOwnerRecipe(obj.id).then(setRecipe);
        getSteps(id).then(setSteps);
      }
      setRecipe(obj);
      getSteps(id).then(setSteps);
    });
  };
  const mountedFavState = () => {
    if (!recipe?.favoriteId) {
      setFavoriteState(false);
    } else {
      setFavoriteState(true);
    }
  };
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  const sortedSteps = (array) => {
    const orderedSteps = array.sort((a, b) => ((a.order > b.order) ? 1 : -1));
    return orderedSteps;
  };
  const handleBack = (() => {
    setShow(false);
    router.push(`/create/recipes/${recipe.id}`);
  });
  const handleShow = () => {
    if (recipe.uid) {
      if (!recipe.completed) {
        setShow(true);
      } else router.push('/read/recipes/userRecipes');
    } else {
      router.back();
    }
  };
  const updateFavoritePayload = (favorite) => {
    const payload = {
      favoriteId: favorite.firebaseKey,
    };
    updateRecipe(favorite.recipeId, payload);
  };
  const handleFavorite = () => {
    const payload = {
      brewTime: recipe.brewTime,
      grindId: recipe.grindId,
      weight: recipe.weight,
      dose: recipe.dose,
      methodId: recipe.methodId,
      processId: recipe.processId,
      uid: recipe.uid,
      recipeName: recipe.recipeName,
      waterTemp: recipe.waterTemp,
      recipeId: recipe.firebaseKey,
      completed: recipe.completed,
    };
    if (favoriteState === true) {
      deleteFavoriteRecipe(recipe.favoriteId).then(() => {
        const deleteLoad = {
          favoriteId: '',
        };
        updateRecipe(recipe.firebaseKey, deleteLoad);
        setFavoriteState(false);
      });
    } else {
      createFavoriteRecipe(payload).then((favoriteObj) => {
        getSingleFavoriteRecipe(favoriteObj.data.firebaseKey).then((favorite) => {
          updateFavoritePayload(favorite);
        });
      });
      setFavoriteState(true);
    }
  };
  const handleSave = () => {
    setShow(false);
    router.push('/');
  };
  const handleEquipment = () => {
    router.push(`/read/equipment/${recipe.firebaseKey}`);
  };
  useEffect(() => {
    renderRecipe();
    mountedFavState();
  }, [user, recipe?.favoriteId]);
  return (
    <>
      {
        recipe.method_id
          ? (
            <>
              <Navbar className="navbar">
                <Nav.Link onClick={handleShow}>
                  <button className="btn-sm" type="button">&#8249; Back</button>
                </Nav.Link>
                <div className="page-title">
                  {recipe.recipeName ? (recipe.recipeName) : ('Create Recipe')}
                </div>
                <Nav.Link onClick={handleFavorite} className="nav-fav">
                  {recipe.favoriteId !== undefined
                    ? (<FavoriteButton favoriteState={favoriteState} />)
                    : ('')}
                </Nav.Link>
                <Nav.Link onClick={handleEquipment} className="nav-cta">
                  <GiManualMeatGrinder />
                </Nav.Link>
              </Navbar>
              <div>
                <div>
                  <div className="circles">
                    <div className="circle"><span className="circle-content">{recipe.dose} g </span></div>
                    <div className="circle"><span className="circle-content">{recipe.weight} g</span></div>
                    <div className="circle"><span className="circle-content">{convertTime(recipe?.brew_time)}</span></div>
                  </div>
                  <div className="circle-footer">
                    <div>Coffe</div>
                    <div>Water</div>
                    <div>Time</div>
                  </div>
                  <div>
                    <div className="list-container">
                      <ul className="list-items">
                        <li>Recipe:
                          <span>{recipe.recipe_name}</span>
                        </li>
                        <li> Grind Size:
                          <span>{recipe.grind_id.grind_size}</span>
                        </li>
                        {!recipe.uid
                          ? ('')
                          : (
                            <li>Author:
                              <span>{recipe?.user_id?.name}</span>
                            </li>
                          )}
                      </ul>
                    </div>
                    <div className="directions-title">
                      <h1>Directions:</h1>
                    </div>
                    <div className="fade-end">
                      <div className="directions">
                        {
                          steps.length
                            ? (
                              sortedSteps(steps).map((step) => (
                                <StepCard key={step.id} stepObj={step} onUpdate={renderRecipe} stepArray={steps} recipeObj={recipe} />
                              ))
                            )
                            : (
                              <div className="empty-content">
                                <IconContext.Provider value={{ size: '4em', color: '#F8F4E3' }}>
                                  <TbCoffeeOff />
                                </IconContext.Provider>
                                <p>Seems empty...<br />Add steps below</p>
                              </div>
                            )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {recipe.uid === undefined
                  ? (
                    ''
                  )
                  : (
                    <div className="process-cta-container">
                      <ViewAllSteps recipe={recipe} />
                      <PublishRecipeButton onUpdate={renderRecipe} recipe={recipe} steps={steps} />
                    </div>
                  )}
                {recipe?.published
                  ? (<BrewButton recipe={recipe} />)
                  : ('')}
              </div>
              <UserProcessModal handleBack={handleBack} show={show} handleClose={handleClose} handleSave={handleSave} />
            </>
          )
          : (
            ''
          )
    }
      {recipe.published
        ? (
          <MainNavBar />
        )
        : ('')}
    </>
  );
}
