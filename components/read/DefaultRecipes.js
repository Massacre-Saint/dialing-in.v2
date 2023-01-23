/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { GiCoffeeBeans } from 'react-icons/gi';
import { IoTimeSharp, IoWaterSharp } from 'react-icons/io5';
import { deleteRecipeSteps, deleteUserRecipeEquipment } from '../../utils/data/apiData/mergeData';
import { deleteProcess } from '../../utils/data/apiData/process';

export default function DefaultRecipes({ recipeObj, render }) {
  const router = useRouter();
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
      deleteUserRecipeEquipment(recipeObj.id);
      deleteRecipeSteps(recipeObj.id).then(() => {
        deleteProcess(recipeObj.id);
        render();
      });
    } else {
      router.push(`/create/process/${recipeObj.id}`);
    }
  };
  useEffect(() => [recipeObj]);
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleClick}>
        <Card.Body>
          <Card.Title>{recipeObj.recipe_name}</Card.Title>
          <Card.Text />
          <div>
            <span>
              <IoTimeSharp />
              {convertTime(recipeObj.brew_time)}&nbsp;&nbsp;
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
        </Card.Body>
      </Card>
    </>
  );
}

DefaultRecipes.propTypes = {
  recipeObj: PropTypes.shape(

    {
      brew_time: PropTypes.number,
      default: PropTypes.bool,
      dose: PropTypes.number,
      grind_id: PropTypes.shape(
        {
          grind_size: PropTypes.string,
          id: PropTypes.number,
          image_url: PropTypes.string,
          order: PropTypes.number,
        },
      ).isRequired,
      id: PropTypes.number,
      method_id: PropTypes.shape(
        {
          description: PropTypes.string,
          dose_max: PropTypes.number,
          dose_min: PropTypes.number,
          id: PropTypes.number,
          image_url: PropTypes.string,
          name: PropTypes.string,
          weight_max: PropTypes.number,
        },
      ).isRequired,
      published: PropTypes.bool,
      recipe_name: PropTypes.string,
      weight: PropTypes.number,
    },
  ).isRequired,
  render: PropTypes.func,
};
DefaultRecipes.defaultProps = {
  render: () => {},
};
