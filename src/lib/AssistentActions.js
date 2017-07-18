const AssistentAction = (actionType, data, lang) => {
  switch (actionType) {
    case '_SAY':
      const voices = window.speechSynthesis.getVoices()
      let msg = new SpeechSynthesisUtterance()
      msg.voice = lang
      msg.rate = 1
      msg.pitch = 1
      msg.text = data
      speechSynthesis.speak(msg)
    break;
  default:

  }
}

export default AssistentAction
