//react
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

//redux
import store from './redux/store/store.js'
import { Provider } from 'react-redux'

//styles
import './index.css'

axios.defaults.baseURL = 'https://videogamesbackend-production-eedc.up.railway.app/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
