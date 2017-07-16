import { LANGS_LIST_LOAD, LANGS_LIST_SELECT_LANG,
         LANGS_LIST_CHANGE_LANG } from '../actionTypes'

export const loadLangs = langs => {
  return {
    type: LANGS_LIST_LOAD,
    langs: langs
  }
}

export const selectLang = lang => {
  return {
    type: LANGS_LIST_SELECT_LANG,
    selectedLang: lang
  }
}

export const changeLang = lang => {
  return {
    type: LANGS_LIST_CHANGE_LANG,
    selectedLang: lang
  }
}
