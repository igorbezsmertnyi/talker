import { combineReducers } from 'redux'
import loadLangs from './loadLangs'
import selectedLang from './selectedLang'
import commands from './commands'
import assistent from './assistent'
import answers from './answers'

const reducers = combineReducers({
  langs: loadLangs,
  selectedLang: selectedLang,
  commands: commands,
  assistent: assistent,
  answers: answers
})

export default reducers
