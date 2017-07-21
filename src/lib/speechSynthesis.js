const SpeechSynthesis = (text, lang) => {
  const voices = window.speechSynthesis.getVoices()
  let msg = new SpeechSynthesisUtterance()
  msg.voice = lang
  msg.rate = 1
  msg.pitch = 1
  msg.text = text
  speechSynthesis.speak(msg)

  return text
}

export default SpeechSynthesis
