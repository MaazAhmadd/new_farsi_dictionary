import axios from 'axios';
import { toast } from 'react-hot-toast';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = 'http://localhost:3002/api';

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    // logger.log(error);
    toast('An unexpected error occured', {
      type: 'error',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

let axiosMod = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default axiosMod;
