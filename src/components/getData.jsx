import React from "react";
import axios from "axios";

const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

const fetchData = async (url, params = {}) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            },
            params
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
};



export const getSolicitudes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GET_SOLICITUDES}`);
      return response.data; // Devolver los datos de la API
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
      throw error; // Propagar el error para manejarlo donde se llame
    }
  };