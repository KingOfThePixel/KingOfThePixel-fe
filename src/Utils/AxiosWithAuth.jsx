import axios from '../../node_modules/axios';

export default function axiosWithAuth () {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://kotp.herokuapp.com/',
    headers: {
      Authorization: token
    }
  });
};