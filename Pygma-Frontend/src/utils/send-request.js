import Cookies from 'js-cookie';

export const sendRequest = async (url, method, body, includeToken = true) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (includeToken) {
      const token = Cookies.get('jwt');
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`An error occurred during the request: ${err.message}`);
  }
};