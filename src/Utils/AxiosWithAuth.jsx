import axios from '../../node_modules/axios';

export default function axiosWithAuth () {
  const token = localStorage.getItem('key');

  return axios.create({
    baseURL: 'https://kotp.herokuapp.com/',
    headers: {
      Authorization: token
    }
  });
};