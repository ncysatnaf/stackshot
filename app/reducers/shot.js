import * as ActionTypes from '../actions'

const init = { isShot: false, content: '', images:[]}

export default function shot( state=init , action ) {
  switch (action.type) {
    case ActionTypes.ADD_IMAGE:
      return {...state, ...{images:[...state.images, action.data]}}
    case ActionTypes.HANDLE_ACTION_CHANGE:
      if(action.parent === 'shot'){
        return Object.assign({}, state, action.data)
      }
    case ActionTypes.RESET_UPLOAD:
      return init
    default:
      return state
  }
}
