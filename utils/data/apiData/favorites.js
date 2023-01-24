import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getFavorites = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/favorites`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getFavorite = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/favorites/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getFavoritebyRecipe = (uid, recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/favorites?recipeId=${recipeId}`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
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
  getFavorites, getFavorite, getFavoritebyRecipe, updateFavoriteRecipe, createFavoriteRecipe, deleteFavoriteRecipe,
};
