import {GET_TEAMS, TEAMS_ERROR, DELETE_TEAM, UPDATE_TEAM, ADD_TEAM} from '../types'
import axios from 'axios'

export const getTeams = () => async dispatch => {
    
    try{
        const res = await axios.get(`https://localhost:44385/api/Teams`)
        dispatch({
            type: GET_TEAMS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: TEAMS_ERROR,
            payload: console.log(e),
        })
    }
}

export const deleteTeam = (id) => async (dispatch) => {
    try{
        await axios.delete(`https://localhost:44385/api/Teams/${id}`)

        dispatch({
            type: DELETE_TEAM,
            payload: id
        })
    }
    catch(e){
        dispatch({
            type: TEAMS_ERROR,
            payload: console.log(e),
        })
    }
}

export const updateTeam = (team) => async (dispatch) => {
    try{
        
        await axios.put(`https://localhost:44385/api/Teams`, team);

        dispatch({
            type: UPDATE_TEAM,
            payload: team,
        })
    }
    catch(e){
        dispatch({
            type: TEAMS_ERROR,
            payload: console.log(e),
        })
    }
}

export const addTeam = (team) => async (dispatch) => {
    try{
        debugger
        await axios.post(`https://localhost:44385/api/Teams`, team);
        const res = await axios.get(`https://localhost:44385/api/Teams`)
        dispatch({
            type: ADD_TEAM,
            payload: res.data,
        })
    }
    catch(e){
        dispatch({
            type: TEAMS_ERROR,
            payload: console.log(e),
        })
    }
}