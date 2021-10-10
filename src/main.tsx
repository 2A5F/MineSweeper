import React from 'react'
import ReactDOM from 'react-dom'
import 'virtual:windi.css'
import './index.scss'
import App from './App'

const root = document.getElementById('root')

root!.addEventListener('contextmenu', e => e.preventDefault())

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
)

