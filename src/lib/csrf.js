import axios from '@/lib/axios';

const csrf = () => axios.get('/sanctum/csrf-cookie');

export default csrf;
