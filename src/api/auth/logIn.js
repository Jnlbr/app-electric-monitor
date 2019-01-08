import fetchApi from '../../utils/fetchApi';

/**
 * @param username
 * @param password
 */
export default async (form) => {
  const options = {
    method: 'post',
    credentials: 'include',
    body: form,
    endpoint: '/auth/login'
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      return data;
    } else {
      return null;
    }
  } catch(err) {
    console.log(`
      PACKAGE: api/auth/logIn
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}