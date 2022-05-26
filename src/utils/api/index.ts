import axios from "axios"
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export class AxiosModel {
  private _object: any
  constructor(lib: any) {
    this._object = lib
  }

  get(uri: string, params = {}, headers = {}) {
    return this._object.get(uri, { params, headers })
  }
}

const axiosFetch = new AxiosModel(axiosClient)
export default axiosFetch
