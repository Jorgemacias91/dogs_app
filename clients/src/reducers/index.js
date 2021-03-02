import {GET_RAZA_DETAIL, GET_RAZA_ALL, GET_RAZA, GET_TEMPERAMENTO, SORT_RAZA} from '../actions/index'

const initialState = { 
    razas : [],
    razasDetail : {},
    temperamento : [],
   
}

function rootReducer(state = initialState, action){

    if(action.type === GET_RAZA_ALL) {
        return {
            ...state,
            razas : action.payload
        }
    }

    if(action.type === GET_RAZA_DETAIL) {
        return {
            ...state,
            razasDetail : action.payload
        }
    }

    if(action.type === GET_RAZA) {
        return {
            ...state,
            razas : action.payload
        }
    }



    if(action.type === GET_TEMPERAMENTO) {
        return {
            ...state,
            temperamento : action.payload
        }
    }


    if(action.type === SORT_RAZA) {
        return {
            ...state,
            razas : action.payload
        }
    }

    return state;
}

export default rootReducer;