import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getMethods = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/methods`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const getMethods = () => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/methods`)
//     .then((response) => response.json())
//     .then((data) => {
//       resolve(Object.entries([{
//         id: data.id,
//         imageUrl: data.image_url,
//         description: data.description,
//         name: data.name,
//         doseMin: data.dose_min,
//         doeseMax: data.dose_max,
//         weightMax: data.weight_max,
//       }]));
//     })
//     .catch((error) => reject(error));
// });
// const getSingleMethod = (firebaseKey) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/methods/${firebaseKey}.json`)
//     .then((response) => resolve(response.data))
//     .catch((error) => reject(error));
// });
const getSingleMethod = (methodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/methods/${methodId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export { getMethods, getSingleMethod };
