import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, {delayResponse: 2000})

if (process.env.NODE_ENV === 'development') axios.defaults.baseURL = 'https://91.201.53.108'
export default mock
