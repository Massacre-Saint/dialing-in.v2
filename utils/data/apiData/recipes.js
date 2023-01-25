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
const createRecipe = () => new Promise((resolve, reject) => {
  const recipe = {};
  fetch(`${dbUrl}/recipes`, {
    method: 'POST',
    body: JSON.stringify(recipe),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});
const updateRecipe = (id, data) => new Promise((resolve, reject) => {
  const recipe = {
    id: data.id,
    brew_time: data.brewTime,
    weight: data.weight,
    recipe_name: data.recipeName,
    published: data.published,
    grind_id: data.grindId,
    method_id: data.methodId,
    dose: data.dose,
  }
  fetch(`${dbUrl}/recipes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(recipe),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getRecipe, getDefaultRecipesByMethod, getRecipesByMethod, createRecipe, updateRecipe,
};
