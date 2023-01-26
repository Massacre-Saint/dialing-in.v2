import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getSteps = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/steps?recipeId=${recipeId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const getStep = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/steps/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const updateStep = (firebaseKey, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/steps/${firebaseKey}.json`, payload)
    .then(resolve)
    .catch(reject);
});

const createStep = (data) => new Promise((resolve, reject) => {
  const step = {
    description: data.description,
    recipe_id: data.recipeId,
  };
  fetch(`${dbUrl}/steps`, {
    method: 'POST',
    body: JSON.stringify(step),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const deleteStep = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/steps/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

export {
  getSteps, getStep, updateStep, createStep, deleteStep,
};
