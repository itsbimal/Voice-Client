import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials:true,
    headers:{
        'Content-type': 'application/json',
        Accept : 'application/json',
    }
    // http://localhost:5500/api/send-otp
});


// list of endopint

export const sendOtp = (data) => api.post('/api/send-otp',data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);
export const logout = () => api.post('/api/logout');
export const createRoom = (data) => api.post('/api/rooms',data);
export const getAllRooms = () => api.get('/api/rooms');
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);


// Interceptors backend and frontend checking
api.interceptors.response.use((config)=>{
    return config;

}, async (error)=>{
    const originalRequest = error.config;
    if (error.response.status === 400 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{
                withCredentials: true,
            });
            
            return api.request(originalRequest);

        } catch (error) {
            console.log(error.message)
        }
    }
    throw error;
});


export default api;