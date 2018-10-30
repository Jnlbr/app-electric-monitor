import fetchApi from '../../../utils/fetchApi';

/**
 * @param firstname
 * @param lastname
 * @param email
 * @param username
 * @param password
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
      return data;
    } else {
      return null;
    }
  } catch(err) {
    throw err;
  }
}