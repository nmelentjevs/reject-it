import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://captainfeelgood-rejectit-backend.kingusha2333.now.sh'
});

export default instance;
