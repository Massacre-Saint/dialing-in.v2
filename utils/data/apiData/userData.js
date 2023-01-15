import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (uid, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`, {
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

const updateUser = (uid, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/user/${uid}.json`, payload)
    .then(() => getUser(uid).then(resolve))
    .catch(reject);
});

export { getUser, updateUser };
