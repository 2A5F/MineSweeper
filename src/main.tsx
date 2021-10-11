import React from 'react'
import ReactDOM from 'react-dom'
import 'virtual:windi.css'
import './index.scss'
import App from './App'
import Github from './Github'

const root = document.getElementById('root')

root!.addEventListener('contextmenu', e => e.preventDefault())

ReactDOM.render(
  <React.StrictMode>
    <Github />
    <App />
  </React.StrictMode>,
  root
)

