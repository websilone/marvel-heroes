import { getHeroes, getHero } from 'utils/api'
import { GET_HEROES_REQUEST, GET_HEROES_SUCCESS } from 'constants/heroes'
import { GET_HERO_REQUEST, GET_HERO_SUCCESS } from 'constants/hero'

const shouldLoadHeroes = state => !state.get('haveBeenLoaded', false)
const getHeroFromId = (heroes, id) => {
    return false
}

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

const loadHero = id => {
    return (dispatch, getState) => {
        if (getHeroFromId(getState().heroes, id)) {
            dispatch({
                type: GET_HERO_SUCCESS,
                hero: {}
            })
        }
        else {
            dispatch({ type: GET_HERO_REQUEST });

            getHero(id)
                .then(json => {
                    dispatch({
                        type: GET_HERO_SUCCESS,
                        hero: json
                    })
                })
        }
    }
}

export {
    loadHeroes,
    loadHero
}
