import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (pk, uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${pk}`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
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
  fetch(`${dbUrl}/users/${pk}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export { getUser, updateUser };
