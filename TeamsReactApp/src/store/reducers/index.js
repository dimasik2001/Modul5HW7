import { combineReducers } from 'redux'
import playersReducer from './playersReducer'
import teamsReducer from './teamsReducer'

export default combineReducers({
  teams: teamsReducer,
  players: playersReducer
})