import react from 'react'

const initialState = {
  page: 1
};

function rootReducer(state = initialState, action) {
  if(action.type == 'switch_page') {
    return Object.assign({}, state, {
      page:action.payload
    })
  }
  return state
};

export default rootReducer;