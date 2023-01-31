/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useAuth } from '../../../../utils/context/authContext';
import { getSteps } from '../../../../utils/data/apiData/steps';
import { StepCard, StepModal, GuidedSteps } from '../../../../components';
import { getRecipe } from '../../../../utils/data/apiData/recipes';
import { getSingleOwnerRecipe } from '../../../../utils/data/apiData/owner';

export default function ShowSteps() {
  const { user } = useAuth();
  const [steps, setSteps] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [author, setAuthor] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const handleBack = () => {
    router.back();
  };
  const renderRoutedData = () => {
    getSteps(id).then((array) => setSteps(array));
    getRecipe(id).then((obj) => {
      if (!obj.default) {
        getSingleOwnerRecipe(obj.id).then((userRecipe) => {
          setAuthor(userRecipe.user_id);
          setRecipe(userRecipe.recipe_id);
        });
      }
      setRecipe(obj);
    });
  };

  useEffect(() => {
    renderRoutedData();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Steps
        </div>
      </Navbar>
      {
        steps.length
          ? (
            <>
              <div>
                <GuidedSteps />
              </div>
              {
                steps.map((step) => (
                  <StepCard onUpdate={renderRoutedData} key={step.id} stepObj={step} author={author} recipeObj={recipe} />
                ))
              }
            </>
          )
          : (
            <div className="empty-content-steps">
              <p>Seems Empty...<br />Add steps below</p>
              <IconContext.Provider value={{ size: '4em', color: '#F8F4E3' }}>
                <AiOutlineArrowDown />
              </IconContext.Provider>
            </div>
          )
      }
      {!recipe.published
        ? (
          <StepModal onUpdate={renderRoutedData} stepArray={steps} recipeObj={recipe} />
        )
        : (
          ''
        )}
    </>
  );
}
