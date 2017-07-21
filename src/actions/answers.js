import { FETCH_ANSWERS_REQUEST, FETCH_ANSWERS_REQUEST_SUCCESS,
         FETCH_ANSWERS_REQUEST_FILED } from '../actionTypes'

export const fetchSuccess = data => {
  return {
    type: FETCH_ANSWERS_REQUEST_SUCCESS,
    answers: data
  }
}

export const fetchFiled = err => {
  return {
    type: FETCH_ANSWERS_REQUEST_FILED,
    answers: err
  }
}

export const fetchAsnwears = () => dispatch => {
  fetch('answers.json')
    .then(res => res.json())
    .then(data => dispatch(fetchSuccess(data)) )
    .catch(err => dispatch(fetchFiled(err)) )
}
