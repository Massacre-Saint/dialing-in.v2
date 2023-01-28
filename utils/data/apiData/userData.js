import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (pk) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${pk}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        name: data.name,
        methodId: data.method_id,
        favRoast: data.fav_roast,
        favShop: data.fav_shop,
        description: data.description,
        imageUrl: data.image_url,
      });
    })
    .catch((error) => reject(error));
});

const updateUser = (pk, data) => new Promise((resolve, reject) => {
  const user = {
    fav_roast: data.favRoast,
    fav_shop: data.favShop,
    description: data.description,
    method_id: data.methodId,
  };
  fetch(`${dbUrl}/users/${pk}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export { getUser, updateUser };
