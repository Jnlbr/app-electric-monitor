import fetchApi from '../../../utils/fetchApi';

/**
 * @param token
 */
export default async (form) => {
  const options = {
    method: 'put',
    headers: {
      "Content-Type":"application/json"
    },
    credentials: 'include',
    body: form,
    endpoint: '/register/token'
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