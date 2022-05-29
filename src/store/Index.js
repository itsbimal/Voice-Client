import {configureStore} from '@reduxjs/toolkit';
import Auth from './AllSlice'


export const store = configureStore({
    reducer:{
        Auth,
    }
});