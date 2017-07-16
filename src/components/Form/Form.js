import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadLangs, selectLang, changeLang } from '../../actions/langs'
import style from './Form.css'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '',
                   isTalk: false,
                   timeOut: 0 }
    this.handleChange = this.handleChange.bind(this)
    this.handleTalk = this.handleTalk.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.reset = this.reset.bind(this)
    this.dectimentTimeOut = this.dectimentTimeOut.bind(this)
  }

  componentWillMount() {
    speechSynthesis.onvoiceschanged = () => {
      this.props.onListLoad(speechSynthesis.getVoices())
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', e => {
      if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 8 || e.keyCode === 32) {
        this.setState({ isTalk: true })
        this.setState({ timeOut: 18  })
        this.dectimentTimeOut()
      }
    })
  }

  dectimentTimeOut() {
    setTimeout(() => {
      if(this.state.timeOut > 0) {
        this.setState({ timeOut: this.state.timeOut - 1 })
        this.dectimentTimeOut()
      } else if (this.state.timeOut === 0) {
        this.handleTalk()
        this.setState({ isTalk: false })
      }
    }, 400)
  }

  handleChange(e) {
    this.props.langs.find((val, index) => {
      if (index == e.target.value) this.props.onLangChanged(val)
    })
    setTimeout(() => {
      this.handleTalk()
    }, 500)
    this.textArea.focus()
  }

  handleKeyUp(e) {
    this.setState({ text: e.target.value })
  }

  handleTalk() {
    const voices = window.speechSynthesis.getVoices()
    let msg = new SpeechSynthesisUtterance()

    if (this.state.isTalk) {
      msg.voice = this.props.selectedLang
      msg.rate = 1
      msg.pitch = 1
      msg.text = this.state.text

      speechSynthesis.speak(msg)

      msg.onstart = () => {
        this.setState({ isTalk: false })
      }

      msg.onend = () => {
        this.setState({ isTalk: true })
      }
    }

    this.textArea.focus()
  }

  reset() {
    this.setState({ text: '', isTalk: false })
    this.textArea.value = ''
    this.textArea.focus()
  }

  render() {
    return (
      <div className={style.container}>
        <form className={style.container__form}>
          <textarea ref={(area) => this.textArea = area}
                    className={style.container__form__textarea}
                    onKeyUp={this.handleKeyUp}
                    autoFocus={true}
                    placeholder="Your text" />
          <div className={style.container__form__selectCont}>
            {this.props.langs && <select className={style.container__form__select}
                              onChange={this.handleChange}>
              {this.props.langs.map((lang, id) =>
                <option key={id} value={id}>{lang.name} - {lang.lang.slice(3, 5)}</option>
              )}
            </select>}
            <div className={style.container__form__select__arrow}></div>
          </div>
          <div className={style.container__action}>
            <button onClick={this.handleTalk} type="button" className={style.container__action__btn}>
              repeat
            </button>
            <button onClick={this.reset} type="button" className={style.container__action__btn}>
              reset
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })

const mapDispatchToProps = (dispatch) => ({
  onListLoad: langs => {
    dispatch(loadLangs(langs))
    dispatch(selectLang(langs[0]))
  },
  onLangChanged: lang => {
    dispatch(changeLang(lang))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
