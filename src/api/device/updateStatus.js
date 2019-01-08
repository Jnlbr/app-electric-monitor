import fetchApi from '../../utils/fetchApi';

/**
 * @param form
 * @param token
 */
export default async (form,token) => {
  console.log(form)
  const options = {
    method: 'put',
    credentials: 'include',
    body: form,
    headers: {
      'x-access-token': token
    },
    endpoint: '/hardware/update/status'
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      console.log(data)
      return data;
    } else {
      return null;
    }
  } catch(err) {
    console.log(`
      PACKAGE: api/device/updateStatus
      METHOD: default
      ERROR: ${err}
    `);
  }
}