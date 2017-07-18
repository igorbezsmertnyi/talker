import { COMMANDS_LIST_LOAD, COMMANDS_LIST_LOAD_SUCCESS,
         COMMANDS_LIST_LOAD_FILED } from '../actionTypes'

const commands = (state = [], action) => {
  switch (action.type) {
    case COMMANDS_LIST_LOAD_SUCCESS:
      return {
        commands: action.commands
      }
    default:
      return state
  }
}

export default commands
