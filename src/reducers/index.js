import { combineReducers } from 'redux'
import loadLangs from './loadLangs'
import selectedLang from './selectedLang'
import commands from './commands'
import assistent from './assistent'

const reducers = combineReducers({
  langs: loadLangs,
  selectedLang: selectedLang,
  commands: commands,
  assistent: assistent
})

export default reducers
