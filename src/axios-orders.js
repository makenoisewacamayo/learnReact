import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-project-4de24.firebaseio.com/'
});

export default instance;