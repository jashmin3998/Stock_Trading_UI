import ax from 'axios'

//http://ec2-54-84-200-65.compute-1.amazonaws.com:8080/
const BaseApiURL = "http://localhost:8080/"
export const nodeAxios = ax.create({
  baseURL: `${BaseApiURL}`,
  headers: {
    Authorization : '0d11cc58-f282-4308-942c-818242450805',
    common: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 50000
})

nodeAxios.interceptors.response.use(
  res => res,
  err => {
    console.log('🚀 ~ file: axios.js ~ line 19 ~ err', err)
    throw err
  }
)
