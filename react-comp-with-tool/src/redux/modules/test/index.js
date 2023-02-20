import { testHttp } from '@/services/home'
// ActionTypes
export const types = {
  SET_IS_LOADING: 'COMMON/SET_IS_LOADING'
}

// State
const initState = {
  isLoading: false
}

// Action
export const actions = {
  testAction: (payload) => {
    return {
      type: types.SET_TEST_INFO,
      payload
    }
  },
  testActionSend: (param) => {
    return (dispatch) => {
      return testHttp(param).then(res => {
        const action = actions.testAction(res.data)
        dispatch(action)
      })
    }
  },
  changeIsloading: (payload) => {
    return {
      type: types.SET_IS_LOADING,
      payload
    }
  }
}

// reducer
const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_TEST_INFO:
      return Object.assign({}, state, {
        testInfo: action.payload
      })
    case types.SET_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload
      })
    default:
      return state
  }
}

export default commonReducer
