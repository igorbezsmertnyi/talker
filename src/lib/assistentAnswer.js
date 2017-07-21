import SpeechSynthesis from './speechSynthesis'

const AssistentAnswer = (lang, answers, assistent) => {
  let answer = ''

  if (lang && answers && assistent.action) {
    const selectLang = answers.answers[lang.lang.slice(0, 2).toLowerCase()]
    selectLang.filter(val => {
      if (val.action == assistent.action) {
        SpeechSynthesis(`${val.key[Math.floor(Math.random() * val.key.length)]}${assistent.query}`, lang)
      }
    })
  }
}

export default AssistentAnswer
