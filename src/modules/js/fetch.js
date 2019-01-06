import axios from 'axios'

export default function fetch(api, param) {
  return new Promise((resolve, reject) => {
    let promise = !!param ? axios.post(api, param) : axios.get(api)
    promise.then(res => {
      let status = res.data.status
      if (status == 200) {
        resolve(res)
      }
      if (status == 300) {
        location.href = 'login.html'
        resolve(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
