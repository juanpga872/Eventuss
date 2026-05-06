import axios from 'axios';

const API_URL = "http://localhost:8080/api/categorias";

export const getCategorias = () => axios.get(API_URL);
export const createCategoria = (categoria) => axios.post(API_URL, categoria);
export const updateCategoria = (id, categoria) => axios.put(`${API_URL}/${id}`, categoria);
export const deleteCategoria = (id) => axios.delete(`${API_URL}/${id}`);