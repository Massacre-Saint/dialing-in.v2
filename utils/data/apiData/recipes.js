import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getRecipe = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/${recipeId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const getDefaultRecipesByMethod = (methodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes?default=True&methodId=${methodId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});
const getRecipesByMethod = (methodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes?methodId=${methodId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});
export {
  getRecipe, getDefaultRecipesByMethod, getRecipesByMethod,
};
