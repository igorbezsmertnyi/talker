import React, { Component } from 'react'
import style from './App.css'
import Form from '../Form/Form.js'
import Assistent from '../Assistent/'

class App extends Component {
  componentDidMount() {
    if (!('speechSynthesis' in window)) {
      alert("Your computer has not any languages")
    }
  }

  render() {
    return (
      <div className={style.App}>
        <Assistent />
        <Form />
      </div>
    )
  }
}

export default App
