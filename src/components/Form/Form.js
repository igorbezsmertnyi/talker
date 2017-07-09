import React, { Component } from 'react'
import style from './Form.css'
import throttle from 'throttle-debounce/throttle'
import debounce from 'throttle-debounce/debounce'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { langs: undefined,
                   selectedLang: undefined,
                   text: '',
                   isTalk: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleTalk = this.handleTalk.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    speechSynthesis.onvoiceschanged = () => {
      this.setState({ langs: [ ...speechSynthesis.getVoices() ] })
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', e => {
      if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode == 8 || e.keyCode == 8) {
        setTimeout(() => {
          throttle(1, this.handleTalk(), false)
          this.setState({ isTalk: false })
        }, 1000)
      }
    })
  }

  handleChange(e) {
    this.setState({ selectedLang: e.target.value })
    this.textArea.focus()
  }

  handleKeyDown() {
    this.setState({ isTalk: true })
  }

  handleKeyUp(e) {
    this.setState({text: e.target.value})
  }

  handleTalk() {
    const voices = window.speechSynthesis.getVoices()
    let msg = new SpeechSynthesisUtterance()

    if (this.state.isTalk) {
      setTimeout(() => {
        msg.voice = voices[this.state.selectedLang]
        msg.rate = 1
        msg.pitch = 1
        msg.text = this.state.text

        speechSynthesis.speak(msg)

        msg.onstart = e => {
          this.setState({ isTalk: false })
        }

        msg.onend = e => {
          this.setState({ isTalk: true })
        }
      }, 200)
    }
  }

  render() {
    const langs = this.state.langs

    return(
      <div className={style.container}>
        <form className={style.container__form}>
          <textarea ref={(area) => this.textArea = area}
                    className={style.container__form__textarea}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                    autoFocus={true}
                    placeholder="Welcome" />
          {langs && <select onChange={this.handleChange}>
            {langs.map((lang, id) => {
              return <option key={id} value={id}>{lang.name} - {lang.lang.slice(3, 5)}</option>
            })}
          </select>}
        </form>
      </div>
    )
  }
}

export default Form
