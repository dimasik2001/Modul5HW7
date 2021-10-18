import {GET_PLAYERS, PLAYERS_ERROR, DELETE_PLAYER, ADD_PLAYER, UPDATE_PLAYER} from '../types'
import axios from 'axios'
import players from '../../component/players'

export const getPlayers = (teamId) => async dispatch => {
    
    try{
        const res = await axios.get(`https://localhost:44385/api/teams/${teamId}/players`)
        dispatch( {
            type: GET_PLAYERS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PLAYERS_ERROR,
            payload: console.log(e),
        })
    }
}

export const deletePlayer = (id) => async (dispatch) => {
    try{
        await axios.delete(`https://localhost:44385/api/teams/players/${id}`)

        dispatch({
            type: DELETE_PLAYER,
            payload: id
        })
    }
    catch(e){
        dispatch({
            type: PLAYERS_ERROR,
            payload: console.log(e),
        })
    }
}

export const updatePlayer = (player) => async (dispatch) => {
    try{
        await axios.put(`https://localhost:44385/api/teams/players`, player)

        dispatch({
            type: UPDATE_PLAYER,
            payload: player
        })
    }
    catch(e){
        dispatch({
            type: PLAYERS_ERROR,
            payload: console.log(e),
        })
    }
}

export const addPlayer= (player) => async (dispatch) => {
    debugger
    try{
        await axios.post(`https://localhost:44385/api/Teams/players`, player);
        const res = await axios.get(`https://localhost:44385/api/teams/${player.teamId}/players`)
        dispatch({
            type: ADD_PLAYER,
            payload: res.data,
        })
    }
    catch(e){
        dispatch({
            type: PLAYERS_ERROR,
            payload: console.log(e),
        })
    }
}


