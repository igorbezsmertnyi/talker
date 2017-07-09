import React, { Component } from 'react'
import style from './Form.css'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { langs: undefined,
                   selectedLang: undefined,
                   text: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillMount() {
    speechSynthesis.onvoiceschanged = () => {
      this.setState({ langs: [ ...speechSynthesis.getVoices() ] })
    }
  }

  handleChange(e) {
    this.setState({ selectedLang: e.target.value })
  }

  handleKeyUp(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit(e) {
    let msg = new SpeechSynthesisUtterance()
    const voices = window.speechSynthesis.getVoices()
    msg.voice = voices[this.state.selectedLang]
    msg.rate = 1
    msg.pitch = 1
    msg.text = this.state.text

    speechSynthesis.speak(msg)
  }

  render() {
    const langs = this.state.langs

    return(
      <form className={style.form}>
        <textarea onKeyUp={this.handleKeyUp} />
        {langs && <select onChange={this.handleChange}>
          {langs.map((lang, id) => {
            return <option key={id} value={id}>{lang.name} - {lang.lang.slice(3, 5)}</option>
          })}
        </select>}
        <input type="button" value="submit" onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default Form
