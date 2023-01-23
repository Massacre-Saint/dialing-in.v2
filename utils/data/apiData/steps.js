import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getSteps = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/steps?recipeId=${recipeId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const updateStep = (firebaseKey, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/steps/${firebaseKey}.json`, payload)
    .then(resolve)
    .catch(reject);
});

const createStep = (stepObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/steps.json`, stepObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/steps/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});
const deleteStep = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/steps/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

export {
  getSteps, updateStep, createStep, deleteStep,
};
