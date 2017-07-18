import { combineReducers } from 'redux'
import loadLangs from './loadLangs'
import selectedLang from './selectedLang'
import commands from './commands'

const reducers = combineReducers({
  langs: loadLangs,
  selectedLang: selectedLang,
  commands: commands
})

export default reducers
