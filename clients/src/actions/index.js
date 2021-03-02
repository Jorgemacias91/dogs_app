export const GET_RAZA_DETAIL = "GET_RAZA_DETAIL";
export const GET_RAZA_ALL = "GET_RAZA_ALL";
export const GET_RAZA = "GET_RAZA";
export const GET_TEMPERAMENTO = "GET_TEMPERAMENTO";
export const SORT_RAZA = "SORT_RAZA";
export const ASD = 'Razas-A-Z';
export const DES = 'Razas-Z-A';

export function getRazasAll() {
    return function (dispatch){
        return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_RAZA_ALL, payload : json})
        })
    }

}


export function getRazasDetails(razaId) {
    return function (dispatch){
        return fetch(`http://localhost:3001/dogs/${razaId}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_RAZA_DETAIL, payload : json})
        })
    }
}

export function getRaza(razaName) {
    return function (dispatch){
        return fetch(`http://localhost:3001/dogs?name=${razaName}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_RAZA, payload : json})
        })
    }
}



export function getTemperamentos() {
    return function (dispatch){
        return fetch(`http://localhost:3001/temperament`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_TEMPERAMENTO, payload : json})
        })
    }
}


export function sort(orden, razas){
    let razaSort = [...razas]

    razaSort.sort(function(a,b){
        var nombreA = a.name.toUpperCase();
        var nombreB = b.name.toUpperCase();

        if(orden === ASD){
            if(nombreA < nombreB){
                return -1;
            }
            if(nombreA > nombreB){
                return 1
            }
            return 0
        }
        if(orden === DES){
            if(nombreA < nombreB){
                return 1;
            }
            if(nombreA > nombreB){
                return -1
            }
            return 0
        }
    })
    return function(dispatch){
        dispatch({type: SORT_RAZA, payload: razaSort})
    }
}

export function filtroTemp(razaActual, temperamento){
    let filtro = [...razaActual];
    filtro = filtro.filter(actual =>{
        if(actual.temperament){
            let razaTemp = actual.temperament.split(', ')
            return razaTemp.includes(temperamento);
        }else{
            return false
        }
    })
    return function(dispatch){
        dispatch({type:SORT_RAZA, payload: filtro})
    }
}



//https://api.thedogapi.com/v1/images/search?breed_ids=1
// forma de buscar por id