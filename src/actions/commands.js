import { COMMANDS_LIST_LOAD_SUCCESS, COMMANDS_LIST_LOAD_FILED } from '../actionTypes'

export const loadCommands = commands => {
  return {
    type: COMMANDS_LIST_LOAD_SUCCESS,
    commands
  }
}

export const loadCommandsFiled = error => {
  return {
    type: COMMANDS_LIST_LOAD_FILED,
    commands: error
  }
}

export const fetchCommands = () => dispatch => {
  fetch('commands.json')
    .then(response => response.json() )
    .then(commands => { dispatch(loadCommands(commands)) })
    .catch(err => dispatch(loadCommandsFiled(err.json())) )
}
