import React, { Component } from 'react'
import style from './App.css'
import Form from '../Form/Form.js'
import Assistent from '../Assistent/'
import ResultModal from '../ResultModal'

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
        <ResultModal />
      </div>
    )
  }
}

export default App
