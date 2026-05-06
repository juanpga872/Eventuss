import axios from 'axios';

const API_URL = "http://localhost:8080/api/eventos";

export const getEventos = () => axios.get(API_URL);
export const createEvento = (evento) => axios.post(API_URL, evento);
export const updateEvento = (id, evento) => axios.put(`${API_URL}/${id}`, evento);
export const deleteEvento = (id) => axios.delete(`${API_URL}/${id}`);