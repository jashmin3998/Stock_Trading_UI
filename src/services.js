const { nodeAxios } = require('./axios')

export const registerUser = async body => {
  return await nodeAxios.post('user/add', body)
}

export const loginUser = async body => {
    return await nodeAxios.post('user/login', body)
}

export const addStock = async body => {
  return await nodeAxios.post('stocks/add', body)
}

export const setSchedule = async body => {
  return await nodeAxios.post('admin/setSchedule', body)
}

export const getStocks = async body => {
  return await nodeAxios.get('stocks/allstocks')
}

export const getStocksTransactions =async body => {
  return await nodeAxios.get('stocks/transaction-history', body)
}