import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import axios from 'axios';

export const getAllData = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllData();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getImportedData = () => async (dispatch) => {
    try {
        const { data } = await api.getImportedAccidents();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAllData = () => async (dispatch) => {
    try {
        const { data } = await api.deleteAll();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAccidentData = (accident_index) => async (dispatch) => {
    try {
        const { data } = await api.deleteAccident(accident_index);

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAccidentData = (accident_index, accident_data) => async (dispatch) => {
    try {
        console.log(accident_data, accident_index);
        const { data } = await api.updateAccident(accident_index, accident_data);

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchAccident = (accident_index) => async (dispatch) => {
    try {
        const { data } = await api.getAccident(accident_index);

        return data;
    } catch (error) {
        console.log(error);
    }
}