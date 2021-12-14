import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import axios from 'axios';


export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);

        dispatch({ type: AUTH, data });

        return true

    } catch (error) {
        console.log(error);

        return false
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data });

        return true

    } catch (error) {
        console.log(error);

        return false
    }
};

export const getUsers = () => async (dispatch) => {

    try {
        const { data } = await api.getUsers();

        return data;
    } catch (error) {
        console.log(error);
    }
}