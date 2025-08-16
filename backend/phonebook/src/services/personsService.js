import axios from "axios";

const BASE_URL = "/api/persons";

const create = (newObject) => {
  return axios.post(BASE_URL, newObject);
};

const get = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

const getAll = () => {
  return axios.get(BASE_URL);
};

const update = (id, updateInfo) => {
  return axios.put(`${BASE_URL}/${id}`, updateInfo);
};

const recycle = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export { create, get, getAll, update, recycle };
