import fetchApi from '../../utils/fetchApi';

/**
 * @param ID
 * @param token
 */
export default async (form, token) => {
  const options = {
    method: 'put',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    body: form,
    endpoint: '/device/update/data'
  }
  try {
    const data = await fetchApi(options);
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(`
      PACKAGE: api/device/updateData
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}