import { CHANGE_FIELD, COUNT_SCORE, LOGOUT, SIGNIN, SIGNUP } from "./actions"

const data = localStorage.getItem('users')
const scores = localStorage.getItem('scores')

const initialState = {
  email: '',
  name: '',
  password: '',
  score: scores ? JSON.parse(scores) : [],
  isAuth: false,
  users: data ? JSON.parse(data) : []
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SIGNIN:
      return { ...state, isAuth: true }
    case SIGNUP:
      const body = [ ...state.users, payload ]
      localStorage.setItem('users', JSON.stringify(body))
      return { ...state, users: body, isAuth: true }
    case LOGOUT:
      return { ...state, isAuth: false }
    case CHANGE_FIELD:
      return { ...state, ...payload }
    case COUNT_SCORE:
      const count = [...state.score, payload]
      localStorage.setItem('scores', JSON.stringify(count))
      return { ...state, score: count}
    default:
      return state;
  }
}

export default reducer