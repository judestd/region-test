import axiosFetch from "../../../utils/api"

const API = {
  GET_ALL: "/all",
  GET_BY_REGION: (region: string) => `/region/${region}`,
  GET_BY_NAME: (name: string) => `/name/${name}`,
  GET_LIST_CODE: (codes: string) => `alpha/?codes=${codes}`,
}

export default class CountriesAPI {
  static getAll = () => axiosFetch.get(API.GET_ALL)

  static getListCodes = (codes: string) =>
    axiosFetch.get(API.GET_LIST_CODE(codes))

  static getByRegion = (region: string) =>
    axiosFetch.get(API.GET_BY_REGION(region))

  static getByName = (name: string) => axiosFetch.get(API.GET_BY_NAME(name))
}
