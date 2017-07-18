import { LANGS_LIST_LOAD } from '../actionTypes'

const loadLangs = (state = [], action) => {
  switch (action.type) {
    case LANGS_LIST_LOAD:
      return [ ...action.langs ]
    default:
      return state
  }
}

export default loadLangs
