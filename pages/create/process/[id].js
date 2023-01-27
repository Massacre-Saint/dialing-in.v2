/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { GiManualMeatGrinder } from 'react-icons/gi';
import { TbCoffeeOff } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import PublishRecipeButton from '../../../components/buttons/PublishRecipeButton';
import ViewAllSteps from '../../../components/buttons/ViewAllSteps';
import MainNavBar from '../../../components/MainNavBar';
import UserProcessModal from '../../../components/modal/UserProcessModal';
import StepCard from '../../../components/read/StepCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleOwnerRecipe } from '../../../utils/data/apiData/owner';
import { getSteps } from '../../../utils/data/apiData/steps';
import BrewButton from '../../../components/buttons/BrewButton';
import {
  getFavoritesbyRecipe, deleteFavorite, createFavorite, getFavorite,
} from '../../../utils/data/apiData/favorites';
import FavoriteButton from '../../../components/buttons/FavoriteButton';
import { getRecipe } from '../../../utils/data/apiData/recipes';

export default function CreateProcess() {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({});
  const [author, setAuthor] = useState({});
  const [steps, setSteps] = useState([]);
  const router = useRouter();
  const [favoriteState, setFavoriteState] = useState(false);
  const [favorite, setFavorite] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { id } = router.query;

  const renderRecipe = () => {
    getRecipe(id).then((obj) => {
      if (!obj.default) {
        getSingleOwnerRecipe(obj.id).then((userRecipe) => {
          setAuthor(userRecipe.user_id);
          setRecipe(userRecipe.recipe_id);
        });
      }
      setRecipe(obj);
      getSteps(id).then(setSteps);
    });
  };
  const mountedFavState = () => {
    getFavoritesbyRecipe(user.uid, id).then((response) => {
      if (response.length) {
        getFavorite(response[0].id).then((obj) => setFavorite(obj));
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    });
  };
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };

  const handleBack = (() => {
    setShow(false);
    router.push(`/create/recipes/${recipe.id}`);
  });
  const handleShow = () => {
    getSingleOwnerRecipe(recipe.id).then((data) => {
      if (data && !recipe.published) {
        setShow(true);
      } else router.push(`/read/recipes/${recipe.method_id.id}`);
    });
  };

  const handleFavorite = () => {
    const payload = {
      recipeId: recipe.id,
    };
    if (favoriteState === true) {
      deleteFavorite(favorite.id).then(() => {
        setFavoriteState(false);
      });
    } else {
      createFavorite(payload, user).then((obj) => setFavorite(obj));
      setFavoriteState(true);
    }
  };
  const handleSave = () => {
    setShow(false);
    router.push(`/read/recipes/${recipe.method_id.id}`);
  };
  const handleEquipment = () => {
    router.push(`/read/equipment/${recipe.id}`);
  };

  useEffect(() => {
    renderRecipe();
    mountedFavState();
  }, [user]);
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
                  {recipe.recipe_name ? (recipe.recipe_name) : ('Create Recipe')}
                </div>
                {
                  recipe.published ? (
                    <Nav.Link onClick={handleFavorite} className="nav-fav">
                      <FavoriteButton favoriteState={favoriteState} />
                    </Nav.Link>
                  )
                    : ('')
                }
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
                        {recipe.default
                          ? ('')
                          : (
                            <li>Author:
                              <span>{author.name}</span>
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
                              steps.map((step) => (
                                <StepCard key={step.id} author={{}} stepObj={step} onUpdate={renderRecipe} stepArray={steps} recipeObj={recipe} />
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
                {recipe.default
                  ? (
                    ''
                  )
                  : (
                    <div className="process-cta-container">
                      <ViewAllSteps recipe={recipe} author={author} />
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
