/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getAllData } from '../../../utils/data/apiData/mergeData';

export default function CreateProcess() {
  const { user } = useAuth();
  const [userRecipe, setUserRecipe] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const renderRecipe = () => {
    getAllData(firebaseKey).then((obj) => setUserRecipe(obj));
  };
  useEffect(() => {
    renderRecipe();
    console.warn(userRecipe);
  }, [user]);

  return (
    <>
      {
      userRecipe.methodObject
        ? (
          <div>
            <div>
              <div>
                <div><span>Cofee: </span>{userRecipe.dose} g</div>
                <div><span>Water: </span>{userRecipe.weight} g</div>
                <div><span>Water: </span>{userRecipe.waterTemp} F°</div>
                <h2>Ratio</h2>
              </div>
              <div>
                <div>
                  <ul>
                    <ul>Recipe: {userRecipe.methodObject.name}</ul>
                    <ul>Brew Time: {userRecipe?.brewTime}</ul>
                    <ul> Grind Size: {userRecipe.grindObject.grindSize}</ul>
                    <ul>Author: {userRecipe.userObject.name}</ul>
                  </ul>
                </div>
                <div>
                  <h1>Directions:</h1>
                </div>
                <div>
                  <div>Steps</div>
                </div>
              </div>
            </div>
            <button type="button">Hello</button>
          </div>
        )
        : (
          ''
        )
    }
    </>
  );
}
