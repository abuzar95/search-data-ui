import axios from "axios";

import { url } from "./config";

export const getUser = () => {
  return axios
    .get(`${url}/getAllUsers`)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTeam = () => {
    return axios
      .get(`${url}/getAllTeams`)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
  };
