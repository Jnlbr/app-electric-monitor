import fetchApi from '../../../utils/fetchApi';

/**
 * @param code
 */
export default async (form) => {
  const options = {
    method: 'post',
    headers: {
      "Content-Type":"application/json"
    },
    credentials: 'include',
    body: form,
    endpoint: '/register/user'
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