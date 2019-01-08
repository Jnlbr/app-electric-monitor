import fetchApi from '../../utils/fetchApi';

/**
 * @param form
 */
export default async (form) => {
  const options = {
    method: 'post',
    headers: {
      "Content-Type":"application/json"
    },
    credentials: 'include',
    body: form,
    endpoint: '/auth/signup'
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      console.log(`
        PACKAGE: api/auth/signUp
        METHOD: default
        DATA: ${JSON.stringify(data)}
      `);
      return data;
    } else {
      return null;
    }
  } catch(err) {
    console.log(`
      PACKAGE: api/auth/signUp
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}