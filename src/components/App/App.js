import React, { Component } from 'react'
import style from './App.css'
import Form from '../Form/Form.js'

class App extends Component {
  componentDidMount() {
    if (!'speechSynthesis' in window) {
      alert("Your computer has not any languages")
    }
  }

  render() {
    return (
      <div className={style.App}>
        <Form />
      </div>
    )
  }
}

export default App
