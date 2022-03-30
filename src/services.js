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


//Cash manage

export const addCashFund =async body => {
  return await nodeAxios.post('user/addtransaction', body)
}

export const getCashBalance =async body => {
  return await nodeAxios.get('user/balance', body)
}

// export const getInvestedBalance =async body => {
//   return await nodeAxios.get('user/used-balance', body)
// }

export const getStatement =async body => {
  return await nodeAxios.get('user/statement', body)
}

//Scheduling

export const getSchedules = async body => {
  return await nodeAxios.get('schedule/getSchedule')
}

export const updateSchedules = async body => {
  return await nodeAxios.put('schedule/set', body)
}


//Stock transaction

export const placeMarketOrder = async body => {
  return await nodeAxios.post('stocks/transaction', body)
}

export const placeLimitOrder = async body => {
  return await nodeAxios.post('stocks/add-limitorder', body)
}


//Limit order

export const getPendingOrders =async body => {
  return await nodeAxios.get('stocks/pending-orders', body)
}

export const removeLimitOrder =async body => {
  return await nodeAxios.delete('stocks/remove-limit-order',body)
}
//User role access
export const getUserRole =async body => {
  return await nodeAxios.get('user/user-role', body)
}


//Portfolio

export const getPortfolio =async body => {
  return await nodeAxios.get('stocks/portfolio', body)
}