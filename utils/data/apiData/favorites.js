import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getFavoriteRecipes = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSingleFavoriteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/favorites/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateFavoriteRecipe = (firebaseKey, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/favorites/${firebaseKey}.json`, payload)
    .then(resolve)
    .catch(reject);
});
const createFavoriteRecipe = (recipeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/favorites.json`, recipeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/favorites/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const deleteFavoriteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/favorites/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});
export {
  getFavoriteRecipes, getSingleFavoriteRecipe, updateFavoriteRecipe, createFavoriteRecipe, deleteFavoriteRecipe,
};
