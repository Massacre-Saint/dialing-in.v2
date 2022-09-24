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
import { getAllData } from '../../../utils/data/apiData/mergeData';
import { getSteps } from '../../../utils/data/apiData/steps';
import BrewButton from '../../../components/buttons/BrewButton';

export default function CreateProcess() {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { firebaseKey } = router.query;
  const renderRecipe = () => {
    getAllData(firebaseKey).then((obj) => setRecipe(obj));
    getSteps(firebaseKey).then((array) => setSteps(array));
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
    router.push(`/create/recipes/${recipe.firebaseKey}`);
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
  const handleSave = () => {
    setShow(false);
    router.push('/');
  };
  const handleEquipment = () => {
    router.push(`/read/equipment/${recipe.firebaseKey}`);
  };
  useEffect(() => {
    renderRecipe();
  }, [user]);
  return (
    <>
      {
      recipe.methodObject
        ? (
          <>
            <Navbar className="navbar">
              <Nav.Link onClick={handleShow}>
                <button className="btn-sm" type="button">&#8249; Back</button>
              </Nav.Link>
              <div className="page-title">
                {recipe.recipeName ? (recipe.recipeName) : ('Create Recipe')}
              </div>
              <Nav.Link onClick={handleEquipment} className="nav-cta">
                <GiManualMeatGrinder />
              </Nav.Link>
            </Navbar>
            <div>
              <div>
                <div className="circles">
                  <div className="circle"><span className="circle-content">{recipe.dose} g </span></div>
                  <div className="circle"><span className="circle-content">{recipe.weight} g</span></div>
                  <div className="circle"><span className="circle-content">{recipe.waterTemp} F°</span></div>
                </div>
                <div className="circle-footer">
                  <div>Coffe</div>
                  <div>Water</div>
                  <div>Temp</div>
                </div>
                <div>
                  <div className="list-container">
                    <ul className="list-items">
                      <li>Recipe:
                        <span>{recipe.recipeName}</span>
                      </li>
                      <li>Brew Time:
                        <span>{convertTime(recipe?.brewTime)}</span>
                      </li>
                      <li> Grind Size:
                        <span>{recipe.grindObject.grindSize}</span>
                      </li>
                      {!recipe.uid
                        ? ('')
                        : (
                          <li>Author:
                            <span>{recipe?.userObject?.name}</span>
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
                              <StepCard key={step.firebaseKey} stepObj={step} onUpdate={renderRecipe} stepArray={steps} recipeObj={recipe} />
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
              {recipe?.completed === true || recipe?.completed === undefined
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
      {recipe.completed || recipe.completed === undefined
        ? (
          <MainNavBar />
        )
        : ('')}
    </>
  );
}
