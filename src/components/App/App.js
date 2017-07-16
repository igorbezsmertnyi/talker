import React, { Component } from 'react'
import style from './App.css'
import Form from '../Form/Form.js'
import Wawe from '../Wave/Wave.js'
import GetSpeech from '../GetSpeech/'

class App extends Component {
  componentDidMount() {
    if (!'speechSynthesis' in window) {
      alert("Your computer has not any languages")
    }
  }

  render() {
    return (
      <div className={style.App}>
        <GetSpeech />
        <Form />
        <Wawe />
      </div>
    )
  }
}

export default App
