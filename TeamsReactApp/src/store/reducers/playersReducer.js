import { DELETE_PLAYER, GET_PLAYERS, UPDATE_PLAYER, ADD_PLAYER } from '../types'

const initialState = {
    players: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                loading: false

            }
        case DELETE_PLAYER:
            return {
                ...state,
                players: state.players.filter(({ id }) => id !== action.payload),
                loading: false
            }

        case UPDATE_PLAYER:

            let newplayer = state.players.find(t => t.id === action.payload.id);
            newplayer.firstName = action.payload.firstName;
            newplayer.lastName = action.payload.lastName;
            return {
                ...state,
                loading: false
            }

        case ADD_PLAYER:
            return {
                ...state,
                players: action.payload,
                loading: false
            }
        default: return state
    }
}