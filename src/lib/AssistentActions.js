const AssistentAction = (data, lang) => {
  switch (data.action) {
    case '_SAY':
      const voices = window.speechSynthesis.getVoices()
      let msg = new SpeechSynthesisUtterance()
      msg.voice = lang
      msg.rate = 1
      msg.pitch = 1
      msg.text = data.text
      speechSynthesis.speak(msg)

      return data.text
      break;
    case '_FIND_STRING':
      fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBHV1MqkbfnWGZFV_ltRNTMJTmZNnnRCBo&cx=003777988849391426723:wrfp6ej_0wi&q=${data.text}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          return data
        })
      break;
  default:

  }
}

export default AssistentAction
