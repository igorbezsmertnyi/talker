import React, { Component } from 'react'
import { fetchCommands } from '../../actions/commands'
import { AssistentAction } from '../../actions/assistent'
import { fetchAsnwears } from '../../actions/answers'
import { connect } from 'react-redux'
import style from './style.css'
import Wave from '../Wave/Wave.js'
import AssistentBtn from '../AssistentBtn'
import ResultModal from '../ResultModal'
import commandContain from '../../lib/commnadParser'

class Assistent extends Component {
  constructor(props) {
    super(props)

    this.state = { recognition: undefined,
                   isDialogActive: false,
                   transcript: undefined,
                   timeOut: 0,
                   answear: false }

    this.dialogActive = this.dialogActive.bind(this)
    this.dectimentTimeOut = this.dectimentTimeOut.bind(this)
  }

  componentDidMount() {
    this.props.onCommandsLoad()
    this.props.onAnswersLoad()

    const grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
    const speechRecognitionList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList )()
    this.setState({ recognition: recognition })
    speechRecognitionList.addFromString(grammar, 1)
    recognition.grammars = speechRecognitionList
    recognition.lang = this.props.selectedLang.lang
    recognition.interimResults = false
    recognition.maxAlternatives = 5

    recognition.onresult = e => {
      const commands = this.props.commands[this.props.selectedLang.lang.slice(0, 2).toLowerCase()]
      const res = e.results[0][0].transcript
      let data = []
      let answear = false

      commands.forEach(command => {
        command.key.forEach((word, wordIndex) => {
          let tmp = commandContain(word, res, command.action)
          if (tmp) data.push(tmp)
          if (data.length && command.key.length - 1 === wordIndex && !answear) {
            answear = true
            this.props.onRes(data[data.length - 1], this.props.selectedLang)
          }
        })
      })

      this.setState({ transcript: res, timeOut: 18 })
      this.dectimentTimeOut()
    }
  }

  dialogActive() {
    this.setState({ isDialogActive: true, transcript: undefined })
    this.state.recognition.lang = this.props.selectedLang.lang
    this.state.recognition.start()
  }

  dectimentTimeOut() {
    setTimeout(() => {
      if(this.state.timeOut > 0) {
        this.setState({ timeOut: this.state.timeOut - 1 })
        this.dectimentTimeOut()
      } else if (this.state.timeOut === 0) {
        this.setState({ isDialogActive: false, answear: false })
      }
    }, 400)
  }

  render() {
    return (
      <div className={style.assistent}>
        <AssistentBtn handleClick={() => {this.dialogActive()}} />
        {this.state.isDialogActive &&
          <div className={style.assistent__dialog}>
            {this.state.transcript &&
              <div className={style.assistent__dialog__speech}>
                <p>{this.state.transcript}</p>
              </div>}
            <div className={style.assistent__dialog__wave}>
              <Wave />
            </div>
            <div className={style.assistent__dialog__overlay}></div>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commands: state.commands.commands,
  selectedLang: state.selectedLang
})

const mapDispatchToProps = dispatch => ({
  onCommandsLoad: () => {
    dispatch(fetchCommands())
  },
  onAnswersLoad: () => {
    dispatch(fetchAsnwears())
  },
  onRes: (dataQuery, lang) => {
    dispatch(AssistentAction(dataQuery, lang))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistent)
