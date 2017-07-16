import { combineReducers } from 'redux'
import loadLangs from './loadLangs'
import selectedLang from './selectedLang'

const reducers = combineReducers({
  langs: loadLangs,
  selectedLang: selectedLang
})

export default reducers
