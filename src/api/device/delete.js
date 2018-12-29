import fetchApi from '../../utils/fetchApi';

/**
 * @param token
 */
export default async (form, token) => {
  console.log(form)
  const options = {
    method: 'delete',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    endpoint: '/device/delete',
    body: form
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
      PACKAGE: api/device/delete
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}