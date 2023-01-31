/* eslint-disable react-hooks/exhaustive-deps */
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getRecipe } from '../../../utils/data/apiData/recipes';
import {
  ChooseBrewTime, ChooseGrindCard, ChooseMethodCard, ChooseWeightCard, CreateNameCard, DeleteRecipeModal,
} from '../../../components';
import { deleteOwnerRecipe } from '../../../utils/data/apiData/owner';

export default function CreateRecipe() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    deleteOwnerRecipe(id);
    handleClose();
    router.push('/');
  };
  const handleClick = () => {
    handleClose();
  };

  const handleSubmit = () => {
    router.push(`/create/process/${recipe.id}`);
  };
  const renderRecipe = () => {
    getRecipe(id).then((obj) => {
      setRecipe(obj);
    });
  };
  const findLength = () => {
    const values = Object.values(recipe);
    let length = 0;
    values.forEach((i) => {
      if (i) { length += 1; }
    });
    return length;
  };
  const recipeProgress = findLength(Object.values(recipe));
  useEffect(() => {
    renderRecipe();
  }, [user, recipeProgress]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleShow}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          {recipe.recipe_name ? (recipe.recipe_name) : ('Create Recipe')}
        </div>
      </Navbar>
      <div>
        <ChooseMethodCard recipeObj={recipe} />
        {recipe.method_id ? (<ChooseGrindCard recipeObj={recipe} />) : ''}
        {recipe.grind_id ? (<ChooseWeightCard onUpdate={renderRecipe} recipeObj={recipe} />) : ''}
        {recipe.weight ? (<ChooseBrewTime onUpdate={renderRecipe} recipeObj={recipe} />) : ''}
        {recipeProgress < 6 ? '' : (<CreateNameCard onUpdate={renderRecipe} recipeObj={recipe} />)}
      </div>
      <div>
        {recipeProgress === 7
          ? (
            <>
              <div className="submit-prompt">
                <p>Let&apos;s move on to more details!</p>
              </div>
              <button type="submit" onClick={handleSubmit} className="btn-submit">Submit</button>
            </>
          )
          : ('')}
      </div>
      <DeleteRecipeModal show={show} handleClose={handleClose} handleClick={handleClick} handleDelete={handleDelete} />
    </>
  );
}
