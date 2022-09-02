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
                <div>{userRecipe.dose}</div>
                <div>{userRecipe.weight}</div>
                <div>{userRecipe.waterTemp}</div>
                <h2>Ratio</h2>
              </div>
              <div>
                <div>
                  <ul>
                    <ul>{userRecipe.methodObject.name}</ul>
                    <ul>{userRecipe?.brewTime}</ul>
                    <ul>{userRecipe.grindObject.grindSize}</ul>
                    <ul>{userRecipe.userObject.name}</ul>
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
