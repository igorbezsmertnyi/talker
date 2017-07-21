import { ASSISTENT_ACTION, ASSISTENT_SET_RESULT, ASSISTENT_CLEAR_RESULT,
         ASSISTENT_ACTION_FIND_STRING_FILED } from '../actionTypes'
import SpeechSynthesis from '../lib/speechSynthesis'


export const reduceAction = (action, data) => {
  return {
    type: `${ASSISTENT_ACTION}${action}`,
    assistent: data
  }
}

export const fetchFiled = err => {
  return {
    type: ASSISTENT_ACTION_FIND_STRING_FILED,
    err: err
  }
}

export const assistentClear = () => {
  return {
    type: ASSISTENT_CLEAR_RESULT
  }
}

export const AssistentAction = (dataQuery, lang) => dispatch => {
  switch (dataQuery.action) {
    case '_SAY':
      const data = SpeechSynthesis(dataQuery.text, lang)
      dispatch(reduceAction(dataQuery.action, dataQuery))
      break
    case '_FIND_STRING':
      fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBHV1MqkbfnWGZFV_ltRNTMJTmZNnnRCBo&cx=003777988849391426723:wrfp6ej_0wi&q=${dataQuery.text}`)
        .then(res => res.json())
        .then(data => {
          dispatch(reduceAction(dataQuery.action,  { data: data, action: dataQuery.action }))
        })
        .catch(err => dispatch(fetchFiled(err)))
      break
    default:
      break
  }
}
