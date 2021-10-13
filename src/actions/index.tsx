import { SET_CACHED_LAUNCHES, SET_SEARCH_TERM } from "./types";
import { launchesAPI } from '../API/APIUrls';
import Launch from '../domain/launch';
import axios from 'axios';



export const fetchLaunches = async () => {
  return await axios.get<Launch[]>(launchesAPI)
    .then(res => {
      return ({ type: SET_CACHED_LAUNCHES, payload: res.data.sort((a, b) => new Date(b.date_local).getTime() - new Date(a.date_local).getTime()).slice(0, 50) });
    });
};


export const setSearchTerm = (searchTerm: String) => ({ type: SET_SEARCH_TERM, payload: searchTerm });