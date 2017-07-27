const config = require('./../../abht.config.js')

const baseURL = config.apiUrl

const axios = require('axios').create({
    baseURL: baseURL,
})


export const _get = req => {
  return axios.get(req.url, { params: req.data })
}

export const _put = req => {
  return axios({ method: 'put', url: `/${req.url}`, data: req.data })
}

export const _post = req => {
  return axios({ method: 'post', url: `/${req.url}`, data: req.data })
}

export const _delete = req => {
  return axios({ method: 'delete', url: `/${req.url}`, data: req.data })
}
