import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getYourRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/owner`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOwnerRecipe = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/owner/${recipeId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const getRecipesByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/owner/${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCreatedMethodRecipes = (methodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/owner?methodId=${methodId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export {
  getYourRecipes,
  getSingleOwnerRecipe,
  getRecipesByUser,
  getCreatedMethodRecipes,
};
