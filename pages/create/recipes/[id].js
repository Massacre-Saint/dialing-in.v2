/* eslint-disable react-hooks/exhaustive-deps */
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { deleteRecipe } from '../../../utils/data/apiData/userRecipes';
import ChooseGrindCard from '../../../components/create/recipes/ChooseGrindCard';
import ChooseMethodCard from '../../../components/create/recipes/ChooseMethodCard';
import ChooseTempCard from '../../../components/create/recipes/ChooseTempCard';
import CreateNameCard from '../../../components/create/recipes/CreateNameCard';
import DeleteRecipeModal from '../../../components/modal/DeleteRecipeModal';
import ChooseBrewTime from '../../../components/create/recipes/ChooseBrewTime';

export default function CreateRecipe() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [userRecipe] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    handleClose();
    router.push('/');
    deleteRecipe(firebaseKey);
    // deleteProcess(userRecipe.processId);
  };
  const handleClick = () => {
    handleClose();
  };
  // const update = (process) => {
  //   const payload = {
  //     processId: process.firebaseKey,
  //     completed: false,
  //   };
  //   updateRecipe(process.recipeId, payload);
  // };
  // const handleSubmit = () => {
  //   const payload = {
  //     recipeId: userRecipe.firebaseKey,
  //   };
    // if (!userRecipe.processId) {
    //   createProcess(payload).then((processObj) => {
    //     getProcess(processObj.data.firebaseKey).then((process) => {
    //       update(process);
    //     });
    //   });
    // }
  //   router.push(`/create/process/${userRecipe.firebaseKey}`);
  // };
  const renderRecipe = () => {
    // getRecipe(id).then((obj) => {
    //   setUserRecipe(obj);
    // });
  };
  useEffect(() => {
    renderRecipe();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleShow}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          {userRecipe.recipeName ? (userRecipe.recipeName) : ('Create Recipe')}
        </div>
      </Navbar>
      <div>
        {!userRecipe.methodId ? (<ChooseMethodCard recipeObj={userRecipe} />) : (<ChooseMethodCard recipeObj={userRecipe} />) }
        {userRecipe.methodId ? (<ChooseGrindCard recipeObj={userRecipe} />) : ''}
        {userRecipe.grindId ? (<ChooseTempCard onUpdate={renderRecipe} recipeObj={userRecipe} />) : ''}
        {userRecipe.weight ? (<ChooseBrewTime onUpdate={renderRecipe} recipeObj={userRecipe} />) : ''}
        {Object.values(userRecipe).length < 8 ? '' : (<CreateNameCard onUpdate={renderRecipe} recipeObj={userRecipe} />)}
      </div>
      <div>
        {Object.values(userRecipe).length > 8
          ? (
            <>
              <div className="submit-prompt">
                <p>Let&apos;s move on to more details!</p>
              </div>
              {/* will need to be handle submit */}
              <button type="submit" className="btn-submit">Submit</button>
            </>
          )
          : ('')}
      </div>
      <DeleteRecipeModal show={show} handleClose={handleClose} handleClick={handleClick} handleDelete={handleDelete} />
    </>
  );
}
