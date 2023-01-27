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

const getFavoritesbyRecipe = (uid, recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/favorites?recipeId=${recipeId}`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createFavorite = (data, user) => new Promise((resolve, reject) => {
  const recipe = {
    recipe_id: data.recipeId,
  };
  fetch(`${dbUrl}/favorites`, {
    method: 'POST',
    body: JSON.stringify(recipe),
    headers: {
      'content-type': 'application/json',
      Authorization: user.uid,
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteFavorite = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/favorites/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
export {
  getFavorites, getFavorite, getFavoritesbyRecipe, createFavorite, deleteFavorite,
};
