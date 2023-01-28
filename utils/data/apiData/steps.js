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

const updateStep = (data, id) => new Promise((resolve, reject) => {
  const step = {
    description: data.description,
    recipe_id: data.recipeId,
  };
  fetch(`${dbUrl}/steps/${id}`, {
    method: 'PUT',
    body: JSON.stringify(step),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
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

const deleteStep = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/steps/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});

export {
  getSteps, getStep, updateStep, createStep, deleteStep,
};
