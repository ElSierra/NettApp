import axios from "axios";

export const httpRequest = axios.create({
  baseURL: "https://netapp.nubiaville.com/api",
});
