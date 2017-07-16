import React, { Component } from 'react'
import style from './style.css'

class GetSpeech extends Component {
  constructor() {
    super()

    this.state = { recognition: undefined,
                   speechRecognitionList: undefined }

    this.handleClick = this.handleClick.bind(this)
  }


  componentDidMount() {
    var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
    var speechRecognitionList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList )()
    this.setState({ recognition: recognition})
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 5

    recognition.onresult = function(event) {
        console.log(event, recognition);
    }
  }

  handleClick() {
    this.state.recognition.start()
  }

  render() {
    return(
      <div>
        <button onClick={this.handleClick} type="button">Call Assisten</button>
      </div>
    )
  }
}

export default GetSpeech
