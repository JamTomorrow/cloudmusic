import axios from 'axios'

// 进行一些全局配置
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://music.kele8.cn'
// axios.defaults.timeout = 5000

// 封装自己的get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(path, data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // console.log(result)
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
