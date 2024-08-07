import axios from "axios";

const API_ENDPOINT = "https://api.aoc.hetorus.nl";
// const API_ENDPOINT = "http://127.0.0.1:5000"; // for testing purposes

axios.defaults.withCredentials = true;

export const apiLeaderboard = async (edition, leaderboard) => {
  return await axios.get(`${API_ENDPOINT}/${edition}/${leaderboard}`);
};

export const apiClearCache = async () => {
  return await axios.get(`${API_ENDPOINT}/clear-cache`);
};

export const apiGetSessionToken = async (token) => {
  return await axios.get(`${API_ENDPOINT}/admin/session/get`);
};

export const apiSetSessionToken = async (token) => {
  return await axios.get(`${API_ENDPOINT}/admin/session/set/${token}`);
};
