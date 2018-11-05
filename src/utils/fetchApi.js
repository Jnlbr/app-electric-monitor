import { API_URL } from './config';

export default async ({ endpoint, method, body = null, headers = {}, formdata = false }) => {
  const url = API_URL + endpoint;
  const _options = options(method,headers,body,formdata);
  try {
    const res = await fetch(url,_options);
    const data = await res.json();
    if(data) {
      const { status, body } = data;
      if (status >= 200 && status < 300)
        return body
      else
        throw body
    } else 
      throw 'Nil data, try again'
  } catch(err) {
    throw err.message || err;
  }
}

const options = (method,headers,body,fd) => {
  const _options = {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json',
      // fd? 'multipart/form-data' : 
      ...headers,
    }
  }
  switch (method.toLowerCase()) {
    case 'get': 
      return {      
        ..._options,
      }
    case 'post':
    case 'delete':
    case 'update':
      return {
        ..._options,
        body: processBody(body,fd)
      }
    default:
      break;
  }
}

const processBody = (body,fd) => {
  if(fd) {
    let _body = new FormData();
    let keys = Object.keys(body);
    keys.forEach(key => body.append(key, body[key]));
    return _body
  } else {
    let _body = JSON.stringify(body);
    return _body
  }
}