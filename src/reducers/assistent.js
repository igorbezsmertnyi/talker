import { ASSISTENT_ACTION, ASSISTENT_SET_RESULT, ASSISTENT_CLEAR_RESULT,
         ASSISTENT_ACTION_SAY, ASSISTENT_ACTION_FIND_STRING,
         ASSISTENT_ACTION_FIND_STRING_FILED } from '../actionTypes'

const assistent = (state = [], action) => {
  switch (action.type) {
    case ASSISTENT_ACTION_SAY:
      return {
        action: action.assistent.action,
        data: action.assistent.text
      }
    case ASSISTENT_ACTION_FIND_STRING:
      return {
        action: action.assistent.action,
        data: action.assistent,
        query: action.assistent.data.queries.request[0].searchTerms
      }
    case ASSISTENT_ACTION_FIND_STRING_FILED:
      return {
        error: action.err
      }
    case ASSISTENT_CLEAR_RESULT:
      return {}
    default:
      return state
  }
}

export default assistent
