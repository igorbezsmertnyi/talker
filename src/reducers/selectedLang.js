import { LANGS_LIST_SELECT_LANG, LANGS_LIST_CHANGE_LANG } from '../actionTypes'

const selectedLang = (state = [], action) => {
  switch (action.type) {
    case LANGS_LIST_SELECT_LANG:
      return action.selectedLang
    case LANGS_LIST_CHANGE_LANG:
      return action.selectedLang
    default:
      return state
  }
}

export default selectedLang
