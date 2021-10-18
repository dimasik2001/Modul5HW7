import { DELETE_TEAM, GET_TEAMS, UPDATE_TEAM, ADD_TEAM } from '../types'

const initialState = {
    teams: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                loading: false

            }
        case DELETE_TEAM:
            return {
                ...state,
                teams: state.teams.filter(({ id }) => id !== action.payload),
                loading: false
            }

        case UPDATE_TEAM:

            let newteam = state.teams.find(t => t.id === action.payload.id);
            newteam.name = action.payload.name;
            newteam.country = action.payload.country;
            return {
                ...state,
                loading: false
            }

        case ADD_TEAM:
            return {
                ...state,
                teams: action.payload,
                loading: false
            }

        default: return state
    }
}