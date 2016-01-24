import { getHeroes } from 'utils/api'
import { GET_HEROES_REQUEST, GET_HEROES_SUCCESS } from 'constants/heroes'

const shouldLoadHeroes = state => !state.get('haveBeenLoaded', false)

const loadHeroes = () => {
    return (dispatch, getState) => {
        if (shouldLoadHeroes(getState().heroes)) {
            dispatch({ type: GET_HEROES_REQUEST })

            getHeroes().then(json => {
                dispatch({
                    type: GET_HEROES_SUCCESS,
                    heroes: json.data.results
                })
            })
        }
    }
}

export {
    loadHeroes
}
