import React, { Component } from 'react'
import style from './App.css'
import Form from '../Form/Form.js'

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <Form />
      </div>
    )
  }
}

export default App
