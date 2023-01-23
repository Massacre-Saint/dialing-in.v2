import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const updateRecipe = (firebaseKey, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/userRecipes/${firebaseKey}.json`, payload)
    .then(resolve)
    .catch(reject);
});

const createRecipe = (recipeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/userRecipes.json`, recipeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/userRecipes/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const deleteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/userRecipes/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});
export {
  updateRecipe, createRecipe, deleteRecipe,
};
