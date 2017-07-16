import React, { Component } from 'react'
import styles from './Wave.css'
import SiriWave from '../../lib/wave.js'

class Wave extends Component {
  constructor(props) {
    super(props)
    this.state = { analyser: undefined,
                   wave: undefined,
                   audioCtx: undefined }
  }

  startAnalize() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const analyser = audioCtx.createAnalyser()
      const microphone = audioCtx.createMediaStreamSource(stream)
      const javascriptNode = audioCtx.createScriptProcessor(8192, 1, 1)
      this.setState({ audioCtx: audioCtx })

      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 4096

      microphone.connect(analyser)
      analyser.connect(javascriptNode)
      javascriptNode.connect(audioCtx.destination)

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(array)
        let values = 0

        for (let i = 0; i < array.length; i++) {
          values += (array[i])
        }

        this.setState({ analyser: values })
      }
    })

    this.draw()
  }

  draw() {
    let waveAnim = new window.SiriWave({
      width: window.offsetWidth,
      height: 120,
      speed: 0.11,
      container: this.canvas,
      autostart: true,
      amplitude: 0,
      speedInterpolationSpeed: 0.008,
      amplitudeInterpolationSpeed: 0.008
    })

    this.setState({ wave: waveAnim })
  }

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia) this.startAnalize()
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.analyser > 9000) nextState.wave.amplitude = 0.5 * (1 + Math.sin(nextState.analyser))
  }

  componentWillUnmount() {
    this.state.audioCtx.close()
  }

  render() {
    return (
      <div className={styles.amplitude}>
        <div ref={(canvas => this.canvas = canvas)}
             className={styles.amplitude__canvas}>
        </div>
      </div>
    )
  }
}

export default Wave
