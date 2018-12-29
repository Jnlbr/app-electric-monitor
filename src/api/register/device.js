import fetchApi from '../../utils/fetchApi';

/**
 * @param code
 */
export default async (form, token) => {
  console.log(form)
  console.log(token)
  const options = {
    method: 'post',
    headers: {
      "Content-Type":"application/json",
      "x-access-token": token
    },
    credentials: 'include',
    body: form,
    endpoint: '/register/device'
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