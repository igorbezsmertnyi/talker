import { FETCH_ANSWERS_REQUEST_SUCCESS, FETCH_ANSWERS_REQUEST_FILED } from '../actionTypes'

const answers = (state = [], action) => {
  switch (action.type) {
    case FETCH_ANSWERS_REQUEST_SUCCESS:
      return {
        answers: action.answers
      }
      break
    case FETCH_ANSWERS_REQUEST_FILED:
      return {
        err: action.err
      }
      break
    default:
      return state
  }
}

export default answers
