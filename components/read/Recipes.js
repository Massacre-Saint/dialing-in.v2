/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { GiCoffeeBeans } from 'react-icons/gi';
import { IoTimeSharp, IoWaterSharp } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';
import { deleteProcess } from '../../utils/data/apiData/process';
import { deleteRecipeSteps, deleteUserRecipeEquipment, getSingleRecipeUser } from '../../utils/data/apiData/mergeData';

export default function Recipes({ recipeObj, render }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  const handleClick = (e) => {
    if (e.target.type === 'button') {
      deleteUserRecipeEquipment(recipeObj.firebaseKey);
      deleteRecipeSteps(recipeObj.firebaseKey).then(() => {
        deleteProcess(recipeObj.processId);
        render();
      });
    } else {
      router.push(`/create/process/${recipeObj.firebaseKey}`);
    }
  };
  const getUser = () => {
    getSingleRecipeUser(recipeObj.firebaseKey).then((obj) => { setUser(obj); });
  };
  useEffect(() => {
    getUser();
  }, [recipeObj]);
  return (
    <>
      {
        recipeObj.completed === false
          ? (
            <Card
              id="card"
              style={{ width: 'auto' }}
              onClick={handleClick}
            >
              <Card.Body>
                <Card.Title>{recipeObj.recipeName}</Card.Title>
                <div>
                  <p>Choose to to finish recipe</p>
                </div>
                {
                  recipeObj.uid
                    ? (
                      <button aria-label="delete" className="card-delete btn-stripped card-delete-btn" onClick={handleClick} type="button"><MdDeleteForever /></button>
                    )
                    : (
                      ''
                    )
                }
                <Card.Text />
              </Card.Body>
            </Card>
          )
          : (
            <Card style={{ width: 'auto' }} onClick={handleClick}>
              <Card.Body>
                <Card.Title>{recipeObj.recipeName}</Card.Title>
                <Card.Text />
                <div>
                  <div>{user.userObject?.name}</div>
                  <span>
                    <IoTimeSharp />
                    {convertTime(recipeObj.brewTime)}&nbsp;&nbsp;
                  </span>
                  <span>
                    <GiCoffeeBeans />
                    {recipeObj.dose}g&nbsp;&nbsp;
                  </span>
                  <span>
                    <IoWaterSharp />
                    {recipeObj.weight}g&nbsp;&nbsp;
                  </span>
                </div>
                {
                  recipeObj.uid
                    ? (
                      <button aria-label="delete" className="card-delete btn-stripped card-delete-btn" onClick={handleClick} type="button"><MdDeleteForever /></button>
                    )
                    : (
                      ''
                    )
                }
              </Card.Body>
            </Card>
          )
      }
    </>
  );
}

Recipes.propTypes = {
  recipeObj: PropTypes.shape(
    {
      brewTime: PropTypes.number,
      grindId: PropTypes.string,
      weight: PropTypes.number,
      methodId: PropTypes.string,
      recipeName: PropTypes.string,
      dose: PropTypes.number,
      waterTemp: PropTypes.number,
      favorite: PropTypes.bool,
      completed: PropTypes.bool,
      firebaseKey: PropTypes.string,
      uid: PropTypes.string,
      processId: PropTypes.string,
    },
  ),
  render: PropTypes.func,
};
Recipes.defaultProps = {
  recipeObj: PropTypes.shape(
    {
      brewTime: 0,
      grindId: '',
      weight: 0,
      methodId: '',
      recipeName: '',
      dose: 0,
      waterTemp: 0,
      favorite: false,
      completed: false,
      firebaseKey: '',
      uid: '',
      processId: '',
    },
  ),
  render: () => {},
};
