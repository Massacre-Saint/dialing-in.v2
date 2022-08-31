import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getUserRecipes = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userRecipes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userRecipes/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const getUserRecipesByMethod = (methodId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userRecipes.json?orderBy="methodId"&equalTo="${methodId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

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
  getUserRecipes, getUserRecipesByMethod, getRecipe, updateRecipe, createRecipe, deleteRecipe,
};
