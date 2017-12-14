import {SET_SORT_ORDER } from '../actions/sortOrder'

const initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case SET_SORT_ORDER: {
      return action.order;
    }
    default: {
      return state;
    }

  }

}
